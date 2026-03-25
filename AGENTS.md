
# Guidelines for making changes in React code
 - You must always give an `id` for each main component, and the `id` should be unique and descriptive. This will help in identifying the component easily when debugging or when using tools like React DevTools.
 - Add the relevant in messages/{language}.json for any new text that you add in the code. This will help in maintaining consistency and making it easier to manage translations if needed in the future.
 - When making changes to the code, ensure that you follow the existing coding style and conventions used in the project. This will help in maintaining readability and consistency across the codebase.
 - Always test your changes thoroughly to ensure that they do not introduce any bugs or issues. This includes testing the functionality of the component, as well as checking for any visual or layout issues that may arise from the changes.

 - If you are making significant changes to a component, consider adding comments to explain the purpose of the changes and how they work. This will help other developers who may be working on the code in the future to understand the changes more easily.

# Design
- Use Framer Motion for animations and transitions to enhance the user experience. This will help in creating smooth and visually appealing interactions within the application.
- Use Shadcn UI components for building the user interface. This will help in maintaining a consistent design language and ensure that the components are well-designed and responsive across different devices.
- Use Shadcn kbd component and icons for keyboard shortcuts and other interactive elements. This will help in improving the usability of the application and making it more intuitive for users to navigate and interact with the interface. And make sure functional things are not only functional but also visually appealing and easy to use and have a key combination assigned.
- Ensure that the design is responsive and works well on different screen sizes and devices. This will help in providing a seamless experience for users regardless of the device they are using to access the application.
- You must use Shadcn ScrollArea component for any scrollable content. This will help in maintaining a consistent design and ensuring that the scrollable areas are visually appealing and easy to use.
- You will never use hard coded colors in the code. Always use the color variables defined in the design system to maintain consistency and make it easier to manage colors across the application. This will also help in ensuring that the design is cohesive and visually appealing. If the color is not there in css variables, you can add it in the design system and use it in the code.