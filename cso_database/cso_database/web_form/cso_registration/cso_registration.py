import frappe
from frappe import _
from datetime import datetime

def get_context(context):
	# do your magic here
	context.no_cache = 1
	print(context.reference_name)
	#check for no new orgs
	if context.reference_name:
		print(frappe.session.user)
		org=frappe.get_doc("Organisation",context.reference_name)
  
		if (frappe.session.user!=org.organisation_gmail) and ("System Manager" not in frappe.get_roles()):
			frappe.redirect_to_message(
			_("Not Organisation User"),
			_("Looks like the gmail used is not linked to the organisation."),
			)
			frappe.local.flags.redirect_location = frappe.local.response.location
			raise frappe.Redirect

	else:
		frappe.redirect_to_message(
			_("No New Organisations"),
			_("Looks like you want to create a new org, it is prohibited this way."),
		)
		frappe.local.flags.redirect_location = frappe.local.response.location
		raise frappe.Redirect

	#check for existant link
	if not frappe.db.exists("Sent Link", {'userid': context.reference_name}):
		frappe.redirect_to_message(
			_("No Such Link"),
			_("Looks like someone sent you to an invalid URL. Please ask them to look into it."),
		)
		frappe.local.flags.redirect_location = frappe.local.response.location
		raise frappe.Redirect
	
	#check for inactive link
	if frappe.db.exists("Sent Link", {'userid': context.reference_name, 'status':'Inactive'}):
		frappe.redirect_to_message(
			_("Link Expired"),
			_("Looks like someone sent you to an expired URL. Please ask them to look into it."),
		)
		frappe.local.flags.redirect_location = frappe.local.response.location
		raise frappe.Redirect
        
	link=frappe.get_doc('Sent Link',{'userid': context.reference_name})
	link.db_set("clicks",link.clicks+1)
	link.db_set("dateclicked",datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        	