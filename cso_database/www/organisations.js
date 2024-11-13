frappe.ready(function() {


    const box = document.getElementsByClassName('card');

    const allChildren = box.length;
    console.log(allChildren);
    frappe.call({
        method: "cso_database.www.organisations.init_load",
        
        callback: function(r){
        posts = r.message;
        console.log()
        const row = document.querySelector('.capsule'); 
        console.log(posts);
        posts.forEach(post => {

            const col = document.createElement('div');
            col.className = 'col';
          
            const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";

        // Update the innerHTML with the conditional thumbnail
        col.innerHTML = `
        <div class="card shadow-sm">
            <img src="${thumbnailSrc}" alt="Thumbnail" class="bd-placeholder-img card-img-top" width="100%" height="225">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <a href='/organisation?name=${post[0]}' target="_blank"><button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
                    </div>
                    <span><small class="text-body-secondary">${post[0].substring(0, 30)}</small></span>
                </div>
            </div>
        </div>
        `;
          
            row.appendChild(col);
          
          });
    }
        });

    });



    $( "#load" ).click(function (event) {
        event.preventDefault();
        const box = document.getElementsByClassName('card');
    
        const allChildren = box.length;
        console.log(allChildren);
        frappe.call({
            method: "cso_database.www.organisations.get_posts",
            args: {
                        number:allChildren
            },
            callback: function(r){
            posts = r.message;
            const row = document.querySelector('.capsule'); 
    
            posts.forEach(post => {

                const col = document.createElement('div');
                col.className = 'col';
              
                const thumbnailSrc = post[3] ? `${post[3]}` : "images/organisation-placeholder.svg";
    
            // Update the innerHTML with the conditional thumbnail
            col.innerHTML = `
            <div class="card shadow-sm">
                <img src="${thumbnailSrc}" alt="Thumbnail" class="bd-placeholder-img card-img-top" width="100%" height="225">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <a href='/organisation?name=${post[0]}' target="_blank"><button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
                        </div>
                        <span><small class="text-body-secondary">${post[0].substring(0, 30)}</small></span>
                    </div>
                </div>
            </div>
            `;
              
                row.appendChild(col);
              
              });
        }
            });
    
        });