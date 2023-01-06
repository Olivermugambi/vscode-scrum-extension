<style>
    div{
        color:aqua;
    }
    div p{
        color:whitesmoke;
    }
</style>
<script>
    // Initialize variables
    let username = "";
    let password = '';
    let context_buttons = true;
    let customers = null;
    let projects = null;
    let daily_scrums = null;
    let resources = null;
    let services = null;
    let login_error = "";
    let customer = null;
    let cust_url = null;
    let project = null;
    let daily_scrum = null;
    let resource = null;
    let service = null;
    let service_url = null;
	// Hide all tables in the sidebar at the beginning
    let customers_div;
    let projects_div;
    let daily_scrums_div;
    let resources_div;
    let services_div;
    let login_div;

    let login_shown = false;
    let customers_shown = false;
    let projects_shown = false;
    let daily_scrums_shown = false;
    let resources_shown = false;
    let services_shown = false;
    let customer_shown = false;
    let create_customer_shown = false;
    let service_shown = false;

    // customer variables
    let customer_name = "";
    let customer_email = "" ;
    let customer_telephone = "";
    let customer_type = "";
    let customer_status = "";
    let customer_address = "";
    let city = "";
    let customer_url = ""
    let registration_number = "";
    let postal_code = "";

    // method to togle context buttons visibility
    function toggle_context_buttons(){
        context_buttons = !context_buttons;
    }

    // Method to close all divs
	function close_all_divs(){
        login_shown = false;
        customers_shown = false;
        projects_shown = false;
        daily_scrums_shown = false;
        resources_shown = false;
        services_shown = false;
        customer_shown = false;
        create_customer_shown = false;
        service_shown = false;
    }

    // Method to clear all variables
	function clear_all_variables(){
        customers = null;
        projects = null;
        daily_scrums = null;
        resources = null;
        services = null;
        login_error = "";
        username = "";
        password = "";
        customer = null;
        cust_url = null;
        project = null;
        daily_scrum = null;
        resource = null;
        service = null;
        service_url = null;
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

    // get developer's customers
    async function get_customers(){
        try{
            if(username == ""){
                throw new Error("please login before loading customers.");
            }else{
                const credentials = btoa(`${username}:${password}`);
                
                const url = `${apiBaseUri}customers/customers/`;
                const response = await fetch(url, {mode: 'cors', headers:{'Authorization':`Basic ${credentials}`}});
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                customers = await response.json();
            }
        }catch(error){
            login_error = error;
        }
    }
    //show cuatomers list
    function show_customers(){
        try{
            if(username == ""){
                throw new Error("please login before loading customers.");
            }else{
                close_all_divs();
                get_customers();
                customers_shown = !customers_shown;
            }
        }catch(error){
                login_error = error;
                close_all_divs();
                login_shown = !login_shown;
        }
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
            }
        }catch(error){
            login_error = error;
        }
    }
    //show projects list
    function show_projects(){ 
        try{
            if(username == ""){
                throw new Error("please login before loading customer projects.");
            }else{
                close_all_divs();
                get_projects()
                projects_shown = !projects_shown;
            }
        }catch(error){
                login_error = error;
                close_all_divs();
                login_shown = !login_shown;
        }
    }

    // get developer daily scrums
    async function get_daily_scrums(){
        try{
            if(username == ""){
                throw new Error("please login before loading daily scrums.");
            }else{
                const credentials = btoa(`${username}:${password}`);
                
                const url = `${apiBaseUri}developers/daily_srums/`;
                const response = await fetch(url, {mode: 'cors', headers:{'Authorization':`Basic ${credentials}`}});
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                daily_scrums = await response.json();
            }
        }catch(error){
            login_error = error;
        }
    }
    //show daily scrums
    function show_daily_scrums(){   
        try{
            if(username == ""){
                throw new Error("please login before loading customer scrums.");
            }else{     
                close_all_divs();
                get_daily_scrums()
                daily_scrums_shown = !daily_scrums_shown;
            }
        }catch(error){
                login_error = error;
                close_all_divs();
                login_shown = !login_shown;
        }
    }

    // get resources list
    async function get_resources(){
        try{
            if(username == ""){
                throw new Error("please login before loading resources.");
            }else{
                const credentials = btoa(`${username}:${password}`);
                
                const url = `${apiBaseUri}resources/resources/`;
                const response = await fetch(url, {mode: 'cors', headers:{'Authorization':`Basic ${credentials}`}});
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                resources = await response.json();
            }
        }catch(error){
            login_error = error;
        }
    }
    //show resources list
    function show_resources(){ 
        try{
            if(username == ""){
                throw new Error("please login before loading available resources.");
            }else{       
                close_all_divs();
                get_resources()
                resources_shown = !resources_shown;
            }
        }catch(error){
                login_error = error;
                close_all_divs();
                login_shown = !login_shown;
        }
    }

    // get services list
    async function get_services(){
        try{
            if(username == ""){
                throw new Error("please login before loading services.");
            }else{
                const credentials = btoa(`${username}:${password}`);
                
                const url = `${apiBaseUri}services/service_pipelines/`;
                const response = await fetch(url, {mode: 'cors', headers:{'Authorization':`Basic ${credentials}`}});
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                services = await response.json();
            }
        }catch(error){
            login_error = error;
        }
    }
    //show services list
    function show_services(){ 
        try{
            if(username == ""){
                throw new Error("please login before loading service pipelines.");
            }else{       
                close_all_divs();
                get_services()
                services_shown = !services_shown;
            }
        }catch(error){
                login_error = error;
                close_all_divs();
                login_shown = !login_shown;
        }
    }

    // fetch customer details
    async function get_customer(cust_url){
        try{
            if(username == ""){
                throw new Error("please login before loading services.");
            }else{
                const credentials = btoa(`${username}:${password}`);
                
                const response = await fetch(cust_url, {mode: 'cors', headers:{'Authorization':`Basic ${credentials}`}});
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                customer = await response.json();
            }
        }catch(error){
            login_error = error;
        }
    }
    const show_customer = url => async () =>{
        cust_url = url;
        close_all_divs();
        await get_customer(cust_url)
        customer_shown = !customer_shown;
    }
    // add new customer
    const add_customer = async () =>{
        toggle_context_buttons();
        close_all_divs();
        create_customer_shown = !create_customer_shown;
    }

    // methodfor posting new cutomer request
    const post_customer_form = async () =>{
        login_error = "";
        try{
            const credentials = btoa(`${username}:${password}`);
            const url = `${apiBaseUri}customers/customers`;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    customer_name,
                    customer_email,
                    customer_telephone,
                    customer_address,
                    city,
                    customer_url,
                    registration_number,
                    postal_code,
                    customer_type,
                    customer_status
                }),
                
            });
            if(!response.ok){
                throw new Error(response.statusText);
            }
            customer = await response.json();
            toggle_context_buttons();
            close_all_divs();
            customer_shown = !customer_shown;
        }catch(error){ 
            login_error = error;
        }
    }
    // method to cancel customer creation
    const back_to_customers = async () => {
        try{
            if(username == ""){
                throw new Error("please login before loading customers.");
            }else{
                toggle_context_buttons();
                close_all_divs();
                get_customers();
                customers_shown = !customers_shown;
            }
        }catch(error){
                login_error = error;
                close_all_divs();
                login_shown = !login_shown;
        }
    }
    
    // fetch service pipeline details
    async function get_service(service_url){
        try{
            if(username == ""){
                throw new Error("please login before loading service.");
            }else{
                const credentials = btoa(`${username}:${password}`);
                
                const response = await fetch(service_url, {mode: 'cors', headers:{'Authorization':`Basic ${credentials}`}});
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                service = await response.json();
            }
        }catch(error){
            login_error = error;
        }
    }
    // method to show service details
    const show_service = url => async () =>{
        service_url = url;
        close_all_divs();
        await get_service(service_url)
        service_shown = !service_shown;
    }
</script>
<div>Scrum project management</div>
{#if context_buttons}
	<!-- svelte-ignore missing-declaration -->
	<button on:click={show_login_form}>Login</button>
	<button on:click={show_customers}>Customers List</button>
	<button on:click={show_projects}>Projects List</button>
	<button on:click={show_daily_scrums}>Daily Scrums</button>
	<button on:click={show_resources}>Resources</button>
	<button on:click={show_services}>Services</button>
	<button on:click={logout}>Logout</button>
{/if}
{#if login_error != ""}
    <p class="error">{login_error}</p>
{/if}
{#if login_shown}
    <div id="login" bind:this={login_div}>    
        <h1>Login</h1>
        Username: <input bind:value={username} class="form-control">
        Password: <input  bind:value={password} type="password" class="form-control">
        <button on:click={post_login_form}>Login</button>
        <p>Don't have an account?</p>
        <button on:click={post_login_form}>Register</button>
    </div>
{/if}

{#if customers_shown}
    <div id="customers" bind:this={customers_div}>
        <h1>Customers list.</h1>
        <div id="customers_list">            
            <button on:click={add_customer}>Add customer</button>
            {#if customers != null}
                {#each customers as customer (customer.customer_name)}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <p on:click="{show_customer(customer.url)}">{customer.customer_name}</p>
                {/each}
            {/if}
        </div>
    </div>
{/if} 

{#if customer_shown}
    <div id="customer">
        <h1>Customer details.</h1>
        <div id="customer_details">
            {#if customer != null}
                <p>Customer Name: </p>{customer.customer_name}
                <p>Customer Email: </p>{customer.customer_email}
                <p>Customer Telephone: </p>{customer.customer_telephone}
                <p>Customer Address: </p>{customer.customer_address}
                <button on:click={show_customers}>Edit customer</button>
                <button on:click={show_customers}>Delete customer</button>
                <button on:click={show_customers}>Customer products</button>
            {:else}
                <p>Customer not found.</p>
                <button on:click={show_customers}>Go back</button>
            {/if}
        </div>
    </div>
{/if} 

{#if create_customer_shown}
    <div id="create_customer">
        <h1>Add customer.</h1>
        <div id="add_customer">
            Customer Name: <input bind:value={customer_name} placeholder="Customer Name">
            Customer Email: <input  bind:value={customer_email} placeholder="Customer Email">
            Customer Telephone: <input bind:value={customer_telephone} placeholder="Customer Telephone">
            Customer Address: <input bind:value={customer_address} placeholder="Customer Address">
            Postal Code: <input bind:value={postal_code} placeholder="Postal Code">
            City: <input bind:value={city} placeholder="City">
            Customer Website: <input bind:value={customer_url} placeholder="Customer Website">
            Regitrstion Number: <input bind:value={registration_number} placeholder="Regitrstion Number">
            Customer Type:<br> <select bind:value={customer_type} placeholder="Customer Type">
                <option value="" selected>Select type</option>
            </select><br>
            Customer Status:<br> <select bind:value={customer_status} placeholder="Customer Status">
                <option value="" selected>Select status</option>
            </select><br>
            <button on:click={post_customer_form}>Save</button>
            <button on:click={back_to_customers}>Go back</button>
        </div>
    </div>
{/if} 

{#if projects_shown}
    <div id="projects" bind:this={projects_div}>
        <h1>My projects list.</h1>
        <div id="projects_list">
            {#if projects !=  null}
                {#each projects as project (project.project_name)}
                    <p>{project.project_name}</p>
                {/each}
            {/if}
        </div>
        
    </div>
{/if}

{#if daily_scrums_shown}
    <div id="daily_scrums" bind:this={daily_scrums_div}>
        <h1>Daily Scrums.</h1>
        <div id="daily_scrums_list">
            {#if daily_scrums !=  null}
                {#each daily_scrums as daily_scrum (daily_scrum.date)}
                    <p>{daily_scrum.date}</p>
                {/each}
            {/if}
        </div>
        
    </div>
{/if}

{#if resources_shown}
    <div id="resources" bind:this={resources_div}>
        <h1>All resources</h1>
        <div id="resources_list">
            {#if resources !=  null}
                {#each resources as resource (resource.resource_name)}
                    <p>{resource.resource_name}</p>
                {/each}
            {/if}
        </div>
        
    </div>
{/if}

{#if services_shown}
    <div id="services" bind:this={services_div}>
        <h1>Service pipelines</h1>
        <div id="services_list">
            <button on:click={add_customer}>Add service</button>
            {#if services !=  null}
                {#each services as service (service.name)}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <p on:click="{show_service(service.url)}">{service.name}</p>
                {/each}
            {/if}
        </div>
        
    </div>
{/if}

{#if service_shown}
    <div id="service">
        <h1>Service details.</h1>
        <div id="service_details">
            {#if service != null}
                <p>Service Name: </p>{service.name}
                <p>Service Description: </p>{service.pipeline_description}
                <p>Service url: </p>{service.url}
                <button on:click={show_customers}>Edit service</button>
                <button on:click={show_customers}>Delete service</button>
                <button on:click={show_customers}>Pipeline</button>
            {:else}
                <p>Customer not found.</p>
                <button on:click={show_customers}>Go back</button>
            {/if}
        </div>
    </div>
{/if} 
