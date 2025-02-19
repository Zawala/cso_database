# Copyright (c) 2024, zw and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SentLink(Document):

    def before_save(self):
        if self.link:
            self.send_link_email()
        
    def send_link_email(self):
        message = f"""
    <p>Dear {self.userid},</p>
    <p>Please upload organisation data on <a href="{self.link}">{self.link}</a> to allow the public to view your org.</p>
    <p>Thank you.</p>
    """

    # Send the email
        frappe.sendmail(
            recipients=[self.email],
            expose_recipients='header',
            subject='Fill in data for Zimcsodatabase',
            message=message,  # HTML content
            header='Upload Data!'
        )

@frappe.whitelist()
def sendmail(name):
    link=frappe.get_doc("Sent Link",name)
    link.send_link_email()