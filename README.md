# ToDoApp - DOMORE
A modern, **fully built frontend task management web app** developed with React.  
DOMORE delivers a complete and polished **user experience** with all core UI features — including task management, calendar, stats, and settings.  

> ⚠️ **Note:** The app is in its **finished frontend state** — it provides all interface logic and user flow but does **not yet connect to real APIs** for authentication or data persistence.

## Main Pages:
1. **Landing Page**
2. **Auth Pages**
    * Sign in.
    * Sign up.
    * Forgot Password, Verify Email, Set Password.
3. **App Pages**
    * Home.
    * Tasks.
    * Stats.
    * Mail.
    * Settings.
    * ...and more.
 
## Features: 
1. Task Management
    * Create, edit, and organize tasks easily.
    * Add descriptive titles, due dates, and details for better clarity.
2. Tag System
    * Assign tags to tasks for quick filtering and organization.
    * Create your own custom tags to match your workflow.

3. Calendar View
    * Visualize tasks on a calendar by day, week, or month.
    * Schedule new tasks directly from the calendar interface.

4. Statistics Dashboard

    * Gain insights into your productivity through detailed charts and graphs.
    * Track progress, completed tasks, and activity trends.

5. Mail & Notifications
    * View task reminders, system messages, and updates in a dedicated mail page.
    
6. Settings & Personalization
    * Switch between Arabic and English interfaces.
    * Toggle dark/light themes and adjust notification preferences.
    * Customize the app with your own accent colors.
    * Manage your account settings in one place.

## Live App

- 👉 Landing / auth pages [domores.vercel.app](https://domores.vercel.app/)
- 👉 App pages [domores.vercel.app/app/home](https://domores.vercel.app/app/home)



## Technologies:
  1. **React.js**
  2. **Tailwind CSS**
  3. **React Router** for routing
  4. **Shadcn** for charts 
  5. **Framer Motion** for animations
  6. **i18next** for internationalization
  7. Deployed on **Vercel**


## Build Instrctions
  * Requirements:
    - Node.js v18 or higher.
    - npm
  1. Clone the repository:  
  ``` git clone https://github.com/WDataW/ToDoApp.git ``` 
  2. Move into the project directory:  
  ``` cd ToDoApp ```
  3. Install dependencies:  
  ``` npm install ```
  4. Run the development server:  
  ``` npm run dev ```
  5. Build for production:  
  ``` npm run build ```
  6. Preview production build:  
  ``` npm run preview ```

##  Deploy Instructions
  1. Clone or fork this repository in your github account.
  2. Go to https://vercel.com/ 
  3. Link your github account to Vercel
  4. Import the cloned/forked github repo into Vercel.
  5. Keep the default build configurations and click deploy.