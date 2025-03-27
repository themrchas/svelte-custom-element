<svelte:options customElement="test-tag1" />


<script lang="ts">

    let { model, year} = $props();

    const delay = (): Promise<string> => {

        return new Promise((resolve,reject) => {

            setTimeout(() => {

                return resolve("Yes - money");

            } ,10000);
    });
};


</script>

<main>

    {#await delay()}
        <h3>Awaiting promise to resolve...</h3>
    {:then data}
        <h3>Hello from Svelte!</h3>
        <h3>The prop values passed are model:'{model}' and year:'{year}'</h3>
        <h4>BTW - resolved promise returned <span style="color:brown">{data}</span></h4>
    {/await} 

</main>