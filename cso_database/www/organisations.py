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
	


@frappe.whitelist(allow_guest=True)
def init_load(search=None):
	print(search)
	posts=frappe.db.get_all('Organisation',
						 filters={"name": ["like", "%{0}%".format(search)]},
						 fields=['Name', 'Background', 'Acronym', 'logo'],
						     as_list=True, limit=9)
	return posts

		
@frappe.whitelist(allow_guest=True)
def get_posts(number,search):
	length=int(number)+9
	posts=frappe.db.get_all('Organisation',
						filters={"organizational_name": ["like", "%{0}%".format(search)]},
						 fields=['Name', 'Background', 'Acronym', 'logo'],
						     as_list=True,
							   start=number,
								 page_length=length)	
	return posts



@frappe.whitelist(allow_guest=True)
def custom_search(number=0,search=None, thematic_area=None, registration_type=None, province=None):
	print(search)
	length=int(number)+9
	posts=frappe.db.get_all('Organisation',
						or_filters={
								 "thematic_areas": ["like", "%{0}%".format(thematic_area)],
								 "provinces": ["like", "%{0}%".format(province)],
								 "registration_type": ["like", "%{0}%".format(registration_type)]
								 },
						filters={
							"organizational_name": ["like", "%{0}%".format(search)],
			  					},	
						 fields=['Name', 'aim_core_business', 'Acronym', 'logo'],
						     as_list=True,
							   start=number,
								 page_length=length)	
	
	return posts
