// Copyright (c) 2024, zw and contributors
// For license information, please see license.txt

frappe.ui.form.on("Sent Link", {
	onload_post_render: function(frm){

        frm.add_custom_button(__('Send Mail'), function(frm){
        if (cur_frm.is_dirty()) {
            frappe.show_alert('Save Link Doctype First')
        }
        frappe.call({
            method: "cso_database.cso_database.doctype.sent_link.sent_link.sendmail",
            args: {
                'name': cur_frm.doc.name,
                
            },
            freeze: true,
            callback: function(r) {
                frappe.msgprint('Message Sent')
                    }
                });
            	
    }).css({"color":"white", "background-color": "#190039", "font-weight": "500"});;
    },
});
