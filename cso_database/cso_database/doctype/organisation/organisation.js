// Copyright (c) 2024, zw and contributors
// For license information, please see license.txt

frappe.ui.form.on("Organisation", {
	
    onload_post_render: function(frm){
        frm.add_custom_button(__('Send Email Link'), function(frm){
            if (cur_frm.is_dirty()) {
                frappe.show_alert('Save Link Doctype First')
            }
            frappe.call({
                method: "cso_database.cso_database.doctype.organisation.organisation.generate_link",
                args: {
                    'name': cur_frm.doc.name,
                    
                },
                freeze: true,
                callback: function(r) {
                    frappe.msgprint('Link Sent')
                        }
                    }, 'primary');
                    
            },);
            frm.add_custom_button(__('Publish'), function(frm){
                if (cur_frm.is_dirty()) {
                    frappe.show_alert('Save Link Doctype First')
                }
                frappe.call({
                    method: "cso_database.cso_database.doctype.organisation.organisation.publish",
                    args: {
                        'name': cur_frm.doc.name,
                        
                    },
                    freeze: true,
                    callback: function(r) {
                        frappe.msgprint('Published Toggled')
                            }
                        }, 'primary');
                        
                },);
        }
});
