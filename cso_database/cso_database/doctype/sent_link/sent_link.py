# Copyright (c) 2024, zw and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SentLink(Document):
    def send_link_email(self):
        # email, name, link=frappe.db.get_value("SentLink", {'userid':self.userid}, ['email' , "name1", "link"])
        message = """
            Dear %s,
                    
            Please Upload Organisation data on, %s To Allow the public to view your org.
                    
   
            Thank you.
            """%(
                self.userid,
                self.link
            )
            
        frappe.sendmail(
                recipients=[self.email],
                expose_recipients = 'header',
                subject='Fill in data for Zimcsodatabase',
                as_markdown=True,
                message=message,
                header=('Upload Data!')
            )


@frappe.whitelist()
def sendmail(name):
    link=frappe.get_doc("Sent Link",name)
    link.send_link_email()