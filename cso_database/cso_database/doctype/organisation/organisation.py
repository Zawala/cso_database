# Copyright (c) 2024, zw and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


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
