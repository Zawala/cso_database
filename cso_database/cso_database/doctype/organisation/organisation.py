# Copyright (c) 2024, zw and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from datetime import date, datetime
from frappe.utils import cstr


class Organisation(Document):
	def before_save(self):
		provinces=[]
		for location in self.location:
			provinces.append(location.province)
		self.provinces=str(provinces)


		thematic_areas=[]
		for thematic in self.table_lozm:
			thematic_areas.append(thematic.thermatic_area)
		self.thematic_areas=str(thematic_areas)

		if ("System Manager" not in frappe.get_roles()):
			self.published=False
		self.add_as_user()
  
	def add_as_user(self):
		if not frappe.db.exists("User", self.organisation_gmail):
			user = frappe.get_doc({
				"doctype":"User",
				"first_name":self.organizational_name,
				"email":self.organisation_gmail

			})
			user.flags.no_welcome_mail= "true"
			user.flags.ignore_permissions="true"
			user.add_roles("Organisation User")
   
	def create_link(self):
		if (frappe.db.exists("Sent Link", {'userid':self.name})):
			old_link = frappe.get_doc("Sent Link", {'userid':self.name})
			old_link.delete(ignore_permissions=True)
		if not self.organisation_gmail:
			frappe.throw("Gmail Link Required")
		link = frappe.new_doc("Sent Link")
		link.email= self.organisation_gmail
		link.save(ignore_permissions=True)
		link.msgid = link.name
		link.userid = self.name
		link.datesent = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
		link.status = 'Active'
		link.added_by = frappe.session.user
		site = cstr(frappe.local.site)
		link.link = f"https://{site}/cso-registration/{self.name}/edit"
		link.save(ignore_permissions=True)


@frappe.whitelist()
def generate_link(name):
    customer=frappe.get_doc("Organisation",name)
    customer.create_link()

@frappe.whitelist()
def publish(name):
    doc=frappe.get_doc("Organisation",name)
    if not doc.published:
        doc.published=True
    else:
        doc.published=False
    doc.save(ignore_permissions=True)

@frappe.whitelist()
def generate_gmails():
	organisations=frappe.db.get_all('Organisation',
						 fields=['Name', 'email_address',  'organisation_gmail'],
								 )
	for org in organisations:
		if org['email_address']:
			if "gmail" in org['email_address']:
				doc=frappe.get_doc('Organisation', org['Name'])
				doc.db_set('organisation_gmail', org['email_address'])
    
@frappe.whitelist()
def send_gmails():
	organisations=frappe.db.get_all('Organisation',
						 fields=['Name', 'organisation_gmail'],
								 )
	for org in organisations:
		if org['organisation_gmail']:
			doc=frappe.get_doc('Organisation', org['Name'])
			doc.create_link()
