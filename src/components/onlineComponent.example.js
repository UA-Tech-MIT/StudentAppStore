import { Query } from "react-apollo";
import gql from "graphql-tag";
import React from 'react';

//DOCS
//Use this template to make an online react component
/**
 * to use this you will need o
 */
// users {
//   firstName,
//   lastName,
//   email,
//   id,
// },
// apps {
// id,
// name,
// appNo,
// createdAt,
// url,
// genre,
// isOfficialResource
// }

const message = `
 This example is querying the current model for users from the database.\n
Our backend uses express, sequlize, graphql and apollo.\n

 If you would like to learn more about the backend please contact Yaateh.\n 
 `;
export class OnlineComponent extends React.Component {
  render() {
    return (
      <Query
        query={gql`
              {
                allUsers{
                  firstName,
                  lastName,
                  email,
                  id,
                }
                allApps {
                  id,
                  name,
                  appNo,
                  createdAt,
                  url,
                  genre,
                  isOfficialResource
                }
              }
            `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <div>
              <h3>Online component example</h3>
              <p>
                {message}
              </p>

              <br />
              <h4>Users</h4>
              {data.users.map(({ firstName, lastName, email, id, }) => (
                <div key={id} className="online-user">
                  <p>{`Name: ${firstName}, ${lastName}`}</p>
                  <p>{`Email: ${email}`}</p>
                  <p>{`hashCode: ${id}`}</p>
                </div>
              ))}
              <br />
              <h4>Apps</h4>
              {data.apps.map(({ id, name, appNo, createdAt, url, genre, isOfficialResource }) => {
                return (
                  <div key={id} className="online-user">

                    <p>{`name: ${name}`}</p>
                    <p>{`hashCode: ${id}`}</p>
                    <p>{`appNo: ${appNo}`}</p>
                    <p>{`createdAt: ${createdAt}`}</p>
                    <p>{`url: ${url}`}</p>
                    <p>{`genre: ${genre}`}</p>
                    <p>{`isOfficialResource: ${isOfficialResource}`}</p>
                  </div>

                );
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}
//NOTE the object desctructuring in the map objects inside anonymous function parameter
// (param) => {
// let x = param.x. // do stufff with x
// }
// is the same as ({x}) => {//do stuff with x}
// 

export default OnlineComponent;
