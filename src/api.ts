//tiedosto data requesteille aka moduuli. More readable
export const deleteCustomer = (url: string) => {
    return fetch(url.toString(), {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting!" + response.statusText)
            return response.json();
        })
} 

export const deleteTraining = (id: string) => {
    return fetch(import.meta.env.VITE_API_URL + "trainings/"+ id , {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting!" + response.statusText)
            return response.json();
        })
} 

export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL + "customers")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers" + response.statusText);

            return response.json();
        })
}

export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_URL + "gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings" + response.statusText);

            return response.json();
        })
}