//Costruiamo le variabili principali
const url = "https://jsonplaceholder.typicode.com/users"; // URL dell'endpoint remoto che fornisce la lista degli utenti
const filterInput = document.getElementById('filterInput'); // Riferimento all'elemento input che serve per filtrare gli utenti
const userTable = document.getElementById('userTable'); // Riferimento all'elemento tabella che conterrà l'elenco degli utenti visualizzati
const filterSelect = document.getElementById('filterSelect'); // Riferimento all'elemento select che serve per specificare la proprietà di filtro

// Funzione asincrona per recuperare gli utenti dall'endpoint remoto
async function fetchUser() { // Funzione asincrona che recupera gli utenti dall'endpoint remoto
  const response = await fetch(url); // Recupera la risposta dall'endpoint remoto
  const users = await response.json(); // Converte la risposta in un oggetto JSON
  console.log(users); // Stampa l'elenco degli utenti nella console del browser
  return users; // Restituisce l'elenco degli utenti
}

// Funzione per renderizzare gli utenti nella tabella
function renderUsers(users) { // Funzione che renderizza gli utenti nella tabella
  userTable.innerHTML = ''; // Pulisce tutto il contenuto della tabella
  users.forEach(user => { // Per ogni utente nella lista
    const row = document.createElement('tr'); // Crea una riga nella tabella
    row.innerHTML = `
      <td>${user.id} </td>
      <td>${user.name} </td>
      <td>${user.username} </td>
      <td>${user.email.toLowerCase()} </td>
    `; // Popola la riga con i dati dell'utente
    userTable.appendChild(row); // Aggiunge la riga alla tabella
  });
}

// Funzione per filtrare gli utenti in base all'input e alla selezione
function filterUsers(users) { // Funzione che filtra gli utenti in base all'input e alla selezione
  const searchText = filterInput.value.toLowerCase(); // Recupera il testo di filtro inserito dall'utente
  const selectValue = filterSelect.value; // Recupera l'opzione selezionata dall'utente
  return users.filter(user => user[selectValue].toLowerCase().includes(searchText)); // Filtra gli utenti in base al testo di filtro e all'opzione selezionata
}

// Chiama la funzione fetchUser e renderizza gli utenti
fetchUser().then((users) => { // Recupera gli utenti dall'endpoint remoto e chiama la funzione renderUsers
  renderUsers(users); // Renderizza gli utenti nella tabella
  filterInput.addEventListener('input', () => { // Aggiorna gli utenti filtrati ogni volta che l'utente cambia l'input di filtro
    const filteredUsers = filterUsers(users); // Filtra gli utenti
    renderUsers(filteredUsers); // Renderizza gli utenti filtrati nella tabella
  });
});


