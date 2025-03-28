<svelte:options customElement="display-sp-list" />

<script lang="ts">

    console.log("Executing code in tag display-sp-list");

    import { getFormDigestValue, ListService } from './ListService';

    let { siteUrl, listName, columnNames, itemsToDisplay=10, filter} = $props();

    //The form digest value for the siteUrl
    let formDigestValue;

    //Create filter (if any) for endpoint
    let restEndPointFilter:string = !filter ? "" : "&filter=filter"

    //REST endpoint to be used
    let endPoint:string = `${siteUrl}/_api/lists/GetByTitle('{listName}'/items${restEndPointFilter}`;
    //let endPoint = "https://jsonplaceholder.typicode.com/users"

    let listService = ListService();

   // listService.getListData(endPoint,"")

   

</script>


<main>

    <h4>Courtesy of Svelte...</h4>

        
    {#await getFormDigestValue(endPoint)} 
        <h3>Grabbing Form digest Value...</h3>
    {:then data}

        formDigestValue = data[0];
        console.log(`Form digest value is ${formDigestValue}`);
        listService.getListData({endPoint},{formDigestValue})

       
    {/await} 






</main>