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
  
	def add_as_user(self):
		if not frappe.db.exists("User", self.organisation_gmail):
			user = frappe.get_doc({
				"doctype":"User",
				"first_name":self.name1,
				"email":self.organisation_gmail

			})
			user.flags.no_welcome_mail= "true"
			user.flags.ignore_permissions="true"
			user.add_roles("Organisation User")
   
	def create_link(self):
		if (frappe.db.exists("Sent Link", {'userid':self.name})):
			old_link = frappe.get_doc("Sent Link", {'userid':self.name})
			old_link.delete(ignore_permissions=True)
		
		link = frappe.new_doc("Sent Link")
		link.save(ignore_permissions=True)
		link.msgid = link.name
		link.email= self.organisation_gmail
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
    
