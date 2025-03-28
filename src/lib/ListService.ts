
let formDigestValue: string;

export const ListService = (): any => {

    return {

         getListData(endPoint:string,formDigestValue: string): void {

            performQuery(endPoint,"GET","").then((data) => {

                console.log(`getListData: ${data}`);

            }) //performQuery

        }
    }

    


} //ListService


export const getFormDigestValue = async (site:string): Promise<string> => {

    return new Promise(async (resolve, reject) => {

        try {
           
            const response = await fetch(`${site}/_api/contextinfo`, {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                },
            }); //fetch
        

            if (!response.ok) {
                // reject(`Error in fetch - ${response.statusText}`);
                resolve(`Error in fetch - ${response.statusText}`);

            }
            else {

                let data: any = await response.json();
                let digestValue = data.d.GetContextWebInformation.FormDigestValue
                resolve(digestValue);
            }

        }
        catch (error) {
            console.log(`encountered error - ${error}`);
            resolve(`Error in catch ${error}`)
        }


    })


} //getFormDigestValue

const performQuery = async (endPoint:string, method:string, formDigestValue:string = "") :Promise<any> => {

        let  headers: any = {  "Content-Type": "application/json;odata=verbose", "Accept": "application/json;odata=verbose"};

        //If we have a form digest value, then add that property to the request header
        headers = formDigestValue ? headers : { ...headers,"X-RequestDigest":formDigestValue};

        const requestHeaders: Headers = new Headers(headers);
        
        const request: Request  = new Request(endPoint,{ method:method, headers:requestHeaders });

        const response = await fetch(request);

        if (!response.ok)
            throw `performquery: Error - ${response.text}`;

        return await response.json()


}