// import React, { useState, useEffect } from 'react';
// import { Redirect } from 'expo-router';

// export default function Index() {
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     const prepareApp = async () => {
//       try {
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         setIsReady(true);
//       } catch (error) {
//         console.error('Error preparing app:', error);
//         setIsReady(true); 
//       }
//     };

//     prepareApp();
//   }, []);

//   return <Redirect href="/(auth)/login" />;
// }