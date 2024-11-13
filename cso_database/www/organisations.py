import json

import frappe
from frappe import _
from frappe.utils import flt
import datetime


no_cache = 1


expected_keys = (
	"query",
	
)


def get_context(context):
	context.no_cache = 1

	# # all these keys exist in form_dict
	if not (set(expected_keys) - set(list(frappe.form_dict))):
		for key in expected_keys:
			context[key] = frappe.form_dict[key]

		context.year=datetime.datetime.now().year
	else:
		frappe.redirect_to_message(
			_("Some information is missing"),
			_("Looks like someone sent you to an incomplete URL. Please ask them to look into it."),
		)
		frappe.local.flags.redirect_location = frappe.local.response.location
		raise frappe.Redirect


@frappe.whitelist()
def init_load():
	posts=frappe.db.get_all('Organisation',fields=['Name', 'Background', 'Acronym', 'logo'],  as_list=True, limit=9)
	return posts

		
@frappe.whitelist()
def get_posts(number):
	length=int(number)+9
	posts=frappe.db.get_all('Organisation',fields=['Name', 'Background', 'Acronym', 'logo'],  as_list=True, start=number, page_length=length)	
	return posts
