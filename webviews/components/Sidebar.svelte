<style>
    div{
        color:aqua;
    }
</style>
<script>
    // Initialize variables
    let username = "";
    let password = '';
    let customers = null;
    let projects = null;
    let scrummasters = null;
    let resources = null;
    let services = null;
    let login_error = "";
	// Hide all tables in the sidebar at the beginning
    let customers_div;
    let projects_div;
    let scrummasters_div;
    let resources_div;
    let services_div;
    let login_div;

    let login_shown = false;
    let customers_shown = false;
    let projects_shown = false;
    let scrummasters_shown = false;
    let resources_shown = false;
    let services_shown = false;

    // Method to close all divs
	function close_all_divs(){
        login_shown = false;
        customers_shown = false;
        projects_shown = false;
        scrummasters_shown = false;
        resources_shown = false;
        services_shown = false;
    }

    // Method to clear all variables
	function clear_all_variables(){
        customers = null;
        projects = null;
        scrummasters = null;
        resources = null;
        services = null;
        login_error = "";
    }
       
    // post login form
    async function post_login_form(){
        login_error = "";
        try{
            const credentials = btoa(`${username}:${password}`);
            const url = `${apiBaseUri}customers/customers`;
            const response = await fetch(url, {mode: 'cors', headers:{'Authorization':`Basic ${credentials}`}});
            if(!response.ok){
                throw new Error(response.statusText);
            }
            customers = await response.json();
            login_shown = !login_shown;
            customers_shown = !customers_shown;
        }catch(error){
            login_error = error;
        }
    }
    //show login form\
    function show_login_form(){
        close_all_divs();
        login_shown = !login_shown;
    }
    //logout
    async function logout(){
        try{
            const url = `${apiBaseUri}api-auth/logout/`;
            const response = await fetch(url, {mode: 'cors', });
            if(!response.ok){
                throw new Error(response.statusText);
            }
            close_all_divs();
            clear_all_variables()
            login_shown = true;
        }catch(error){
            console.error(error);
        }
    }
    //show cuatomers list
    function show_customers(){
        close_all_divs();
        customers_shown = !customers_shown;
    }
    // get developer projects
    async function get_projects(){
        try{
            if(username == ""){
                throw new Error("please login before loading projects.");
            }else{
                const credentials = btoa(`${username}:${password}`);
                
                const url = `${apiBaseUri}developers/project/`;
                const response = await fetch(url, {mode: 'cors', headers:{'Authorization':`Basic ${credentials}`}});
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                projects = await response.json();
                projects_shown = !projects_shown;
            }
        }catch(error){
            login_error = error;
        }
    }
    //show projects list
    function show_projects(){        
        close_all_divs();
        get_projects()
        projects_shown = !projects_shown;
    }
</script>
<div>Scrum project management</div>
<!-- svelte-ignore missing-declaration -->
<button on:click={show_login_form}>Login</button>
<button on:click={show_customers}>Customers List</button>
<button on:click={show_projects}>Projects List</button>
<button on:click={show_scrums}>Scrum</button>
<button on:click={show_resourcess}>Resources</button>
<button on:click={show_services}>Services</button>
<button on:click={logout}>Logout</button>
{#if login_error != ""}
    <p>{login_error}</p>
{/if}
{#if login_shown}
    <div id="login" bind:this={login_div}>    
        <h1>Login</h1>
        Username: <input bind:value={username} class="form-control">
        Password: <input  bind:value={password} type="password" class="form-control">
        <button on:click={post_login_form}>Login</button>
    </div>
{/if}

{#if customers_shown}
    <div id="customers" bind:this={customers_div}>
        <h1>Customers list.</h1>
        <div id="customers_datatable">
            {#if customers != null}
                {#each customers as customer (customer.customer_name)}
                    <p>{customer.customer_name}</p>
                {/each}
            {/if}
        </div>
    </div>
{/if}

{#if projects_shown}
    <div id="projects" bind:this={projects_div}>
        <h1>My projects list.</h1>
        <div id="projects_list">
            {#if projects !=  null}
                {#each projects as project (project.project_name)}
                    <p>(project.project_name)</p>
                {/each}
            {/if}
        </div>
        
    </div>
{/if}

{#if scrummasters_shown}
<div id="scrummasters" bind:this={scrummasters_div}>
<table id="scrummasters_datatable">
    <thead></thead>
    <tbody></tbody>
</table>
</div>
{/if}

{#if resources_shown}
<div id="resources" bind:this={resources_div}>
<table id="resources_datatable">
    <thead></thead>
    <tbody></tbody>
</table>
</div>
{/if}

{#if services_shown}
<div id="services" bind:this={services_div}>
<table id="services_datatable">
    <thead></thead>
    <tbody></tbody>
</table>
</div>
{/if}