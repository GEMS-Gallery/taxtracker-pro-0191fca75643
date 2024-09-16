import { backend } from 'declarations/backend';

// Function to add a new TaxPayer
async function addTaxPayer(event) {
    event.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    try {
        await backend.addTaxPayer(tid, firstName, lastName, address);
        alert('TaxPayer added successfully');
        document.getElementById('addTaxPayerForm').reset();
        displayAllTaxPayers();
    } catch (error) {
        console.error('Error adding TaxPayer:', error);
        alert('Failed to add TaxPayer');
    }
}

// Function to search for a TaxPayer by TID
async function searchTaxPayer() {
    const searchTid = document.getElementById('searchTid').value;
    const searchResult = document.getElementById('searchResult');

    try {
        const result = await backend.getTaxPayer(searchTid);
        if (result.length > 0) {
            const taxPayer = result[0];
            searchResult.innerHTML = `
                <h3>Search Result:</h3>
                <p>TID: ${taxPayer.tid}</p>
                <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p>Address: ${taxPayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with the given TID.</p>';
        }
    } catch (error) {
        console.error('Error searching for TaxPayer:', error);
        searchResult.innerHTML = '<p>Error occurred while searching for TaxPayer.</p>';
    }
}

// Function to display all TaxPayers
async function displayAllTaxPayers() {
    const taxPayerList = document.getElementById('taxPayerList');

    try {
        const allTaxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '<h3>All TaxPayers:</h3>';
        allTaxPayers.forEach(taxPayer => {
            taxPayerList.innerHTML += `
                <div>
                    <p>TID: ${taxPayer.tid}</p>
                    <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
                    <p>Address: ${taxPayer.address}</p>
                    <hr>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error fetching all TaxPayers:', error);
        taxPayerList.innerHTML = '<p>Error occurred while fetching TaxPayers.</p>';
    }
}

// Event listeners
document.getElementById('addTaxPayerForm').addEventListener('submit', addTaxPayer);

// Initial display of all TaxPayers
displayAllTaxPayers();