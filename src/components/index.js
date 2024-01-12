export const codeStrings = [
    {
      id: 1,
      codeString: `
        // Function to calculate the square of a number
        const square = (num) => num * num;
        
        // Example usage
        const result = square(4);
        console.log(result); // Output: 16
      `,
    },
    {
      id: 2,
      codeString: `
        // Function to check if a number is even
        const isEven = (num) => num % 2 === 0;
        
        // Example usage
        const number = 10;
        console.log(isEven(number)); // Output: true
      `,
    },
    {
      id: 3,
      codeString: `
        // Function to capitalize the first letter of a string
        const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
        
        // Example usage
        const text = "hello world";
        console.log(capitalizeFirstLetter(text)); // Output: Hello world
      `,
    },
    {
      id: 4,
      codeString: `
        // Function to find the maximum number in an array
        const findMax = (numbers) => Math.max(...numbers);
        
        // Example usage
        const numbersArray = [4, 8, 2, 10, 5];
        console.log(findMax(numbersArray)); // Output: 10
      `,
    },
  ];
  