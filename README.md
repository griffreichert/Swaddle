# README #
---
**Contributors**:
Griffin Reichert
Alex Schiffman

---

## Summary of the Project ##

For young couples, sharing important pregnancy milestones with friends and family is a significant part of this special time in their lives. To learn about this issue, we spoke with over 60 moms, and 15 practicing medical professionals from accross the country. What we learned from our market research is that new mothers want to share and preserve pregnancy updates with loved ones but have difficulty balancing between privacy and publicity. From this market research, we came up with the following customer needs:

* Maternity Focus - A solution needs to be tailored to this special time in a new mother's life.
* Privacy - Keeping data and information protected is important
* Customizable Reach - So that mothers can feel confident sharing with the exact circle of people they want to.  
* Permanent Storage - These milestones are something that families will want to look back upon for years to come. 
* Low Information Delay - When important milestones happen, they need to be quickly shared with friends and family. 

**Problem Statement**
Moms want control over the size of their sharing circle without losing the ability to celebrate and preserve their pregnancy for loved ones and their future.

In looking at the solutions existing in the market, none of these met all 5 of our customer needs. Typical social media like Facebook and Instagram are very public, and can provide overwhelming responses. Other solutions like texting and shared photo collections require lots of effort on the part of the moms and dads who will be sharing these milestones. 

From our market research, and competitive analysis, our team created Swaddle. Swaddle is an app that enables expecting couples to share, celebrate, and preserve important pregnancy milestones with their loved ones. It allows expecting couples to upload images, videos, and messages, organize them using tags, and share them with their specific contacts. It organizes these posts in a feed so that they can be filtered, and looked back on in the future. 

This app was made in collaboration with Dr. Martin Martino from the Lehigh Valley Health Network, who is pursuing further development to publish this project. 

## Organization ## 

The app is broken into two main directories. `frontend` stores the frontend app code while `backend-py` stores the backend. 

**Frontend**
Most of the frontend code will be found in the `src` directory. React is a component based framework, so most of the app itself is in the `components` directory. The API and navigation is found under `internals`.

**Backend**
Our backend was designed using Flask to enable our REST APIs. Routes can be found in the `api.py` file. 

## Configuration ##
---
This app utilizes Expo, and a variety of dependencies which can be configured as follows.

**Commands to install packages**

Run the following bash commands to install and configure the required packages.

```
npm install
```
Install [Expo](https://docs.expo.io/get-started/installation/)

## Dependencies Used ##
---

A variety of libraries and dependencies helped make this app possible: 

* [React Native][1]: A native framework that allows the app to be cross platform
* [React Native Paper][2]: A material UI library that helped us create the design and appearence
* [Expo][3]: A variety of useful components to enhance functionality
* [React Native Navigation][4]: Ability to seamlessly navigate between components

## Running the App ##
---

This app uses expo to run on both iOS and Android devices. To use it, download Expo Client from the App Store / Google Play store.

The app can be run in development mode by running:
```
npm start
```
It can be published to expo where it can be run in a production environment using:
```
expo publish
```

*Note*: Comment out line 89 in the CardCover.tsx file located under @react-native-paper/card in node modules. ("Resize mode: 'contain'") 


[1]: https://reactnative.dev/docs/getting-started
[2]: https://callstack.github.io/react-native-paper/index.html
[3]: https://docs.expo.io/versions/latest/
[4]: https://reactnavigation.org/docs/hello-react-navigation/
[5]: https://aws.amazon.com/