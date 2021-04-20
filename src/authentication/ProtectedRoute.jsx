// import { Route , Redirect} from "react-router-dom";

// const ProtectedRoute = ({isAuthenticated:isAuthenticated, component: Component, logout:logout,setIsAuthenticated:setIsAuthenticated, ...rest })=>{

//     return(
//         <Route {...rest}
//         render={(props)=>{
//             if(isAuthenticated){
//                 return <Component logout={logout} setIsAuthenticated={setIsAuthenticated}/>
//             } else{
//                 return(
//                     <Redirect to="/login" />
//                 )
//             }
//         }
//         }
//         >
//         </Route>
//     )

// }

// export default ProtectedRoute

// // const ProtectedRoute = props => {
// //     const { isAuthenticated, setIsAuthenticated, component: Component } = props;
// //     console.log(isAuthenticated,'isAuthenticated')
// //     return (
// //       <Route
// //         render={props => {
// //           if (isAuthenticated) {
// //             return <Component setIsAuthenticated={setIsAuthenticated}  />;
// //           } else {
// //             return <Redirect to={{ pathname: "/login", state: {from: props.location}}} />;
// //           }
// //         }}
// //       ></Route>
  
// //       const PrivateRoute = ({ component: Component, ...rest }) => (
// //           <Route {...rest} render={(props) => (
// //               auth.isAuthenticated === true
// //               ? <Component {...props} />
// //               : <Redirect to="/login" />
// //           )} />
// //       )
      
// //     );
// //   };