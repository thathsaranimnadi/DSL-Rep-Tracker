# DSL-Rep-Tracker
<p align ="center">
     <img src="images/logo.png" width=500  />
</p><br>

## Problem Background
One well-known auto parts firm, Douglas and Sons, depends on its sales agents to deliver merchandise to clients in different parts of the country. The company has no system in place to monitor the real-time location of these sales reps during their deliveries. Significant difficulties arise from this lack of visibility, such as the inability to monitor the effectiveness and responsibility of the sales team, the possibility of supply delays, and the inability to get up-to-date information on the locations of the sales representatives. Because of this, the business finds it difficult to efficiently oversee its delivery operations and guarantee that clients receive their goods on schedule.

## Proposed Solution
To address these challenges, Douglas and Sons proposes the development of an Android-based GPS tracking app named LocationTracker. This app is designed to monitor the real-time location of sales representatives, with updates every 15 minutes. The app will include features such as real-time location updates, historical data storage, and secure user authentication. Additionally, LocationTracker will have a built-in notification system that alerts the admin if a sales rep turns off location tracking or if there is any interruption in data reporting. This ensures that any potential issues are promptly addressed, enhancing operational efficiency and accountability. By implementing LocationTracker Douglas and Sons will improve visibility into delivery operations, optimise route planning, and ensure timely deliveries, ultimately leading to increased operational efficiency and customer satisfaction.

## Features
1. Real-Time location tracking 
    - Automatic updates : Sales reps’ locations are updated every 15 minutes.
    - Background Location Tracking: Continues to update even if the app is not in  the foreground.
2. Google map integration
    - Map Display: Show the current location of sales reps on a Google Map.
    - Location Markers: Display markers for each sales rep’s location.
3. Admin notifications
    - Data/Location off alert: Notify the admin if a sales rep turns off data or location services.
    - Push notifications: Real-time alerts through firebase cloud messaging.
4. Admin DashBoard
    - Login/Authentication: Admins can log in securely using Firebase authentication.
    - Location overview: Admins can view the current location of all sales reps.
    - Alerts management: View and manage alerts related to sales reps turning off location or data.
5. Secure Data Storage
    - Firebase firestore: Store sales representatives’ password, username, email address and other data which have to store in registration process, location data securely and ensure real-time updates.

## Tech stack
### React Native
<p align ="center">
     <img src="images/reactnative.png" width=500  />
</p><br>

React Native is an open-source framework used in this project to develop a mobile app for tracking sales representatives' locations. We chose React Native because it allows us to create a cross-platform solution with one codebase, running on both Android and iOS devices. This saves time and resources. The app integrates with Firebase for real-time data updates, user authentication, and push notifications, providing a smooth experience for both sales representatives and administrators.

### Firebase
<p align ="center">
     <img src="images/firebase.png" width=500  />
</p><br>

Firebase, provided by Google, is used in this project because it's easy to integrate and has powerful features. It offers real-time database updates, secure user login, and push notifications. Firebase also allows us to run backend functions without managing servers, making it perfect for our app that tracks sales representatives' locations across Android and iOS.






