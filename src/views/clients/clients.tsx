export const Clients = ({ clientsData }: any) => (
  <main>
    <ol>
      {clientsData &&
        clientsData.map(({ id, first_name, last_name, email }: any) => (
          <li key={id}>
            <p>{first_name + " " + last_name}</p>
            <p>{email}</p>
          </li>
        ))}
    </ol>
  </main>
);
