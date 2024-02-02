document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin-button');
    const segments = [
      { label: '$5 Gift Card', color: '#f5cfc4' },
      { label: 'Free Shipping', color: '#f5dec4' },
      { label: '$10 Gift Card', color: '#f7f3c8' },
      { label: 'Jewelry Polish', color: '#d0f7c8' },
      { label: 'Custom Packaging', color: '#c8e1f7' },
      { label: '5% Discount Code', color: '#dec8f7' }
    ];
    const numSegments = segments.length;
    const segmentAngle = (2 * Math.PI) / numSegments;
    let currentRotation = 0; // Current rotation angle in radians
    const radius = canvas.width / 2;
  
    // Utility function to draw the wheel
    function drawWheel() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      segments.forEach((segment, index) => {
        ctx.beginPath();
        ctx.fillStyle = segment.color;
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, index * segmentAngle + currentRotation, (index + 1) * segmentAngle + currentRotation);
        ctx.lineTo(radius, radius);
        ctx.fill();
  
        // Draw text
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(index * segmentAngle + segmentAngle / 2 + currentRotation);
        ctx.textAlign = "right";
        ctx.fillStyle = "black";
        ctx.font = "18px Helvetica, Arial, sans-serif";
        ctx.fillText(segment.label, radius - 10, 10);
        ctx.restore();
      });
    }
  
    // Utility function to draw the arrow
    function drawArrow() {
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(radius - 20, 30); // Size of the arrow, adjust as needed
      ctx.lineTo(radius + 20, 30);
      ctx.closePath();
      ctx.fill();
    }
  
    // Animation ease out function for smooth spinning
    function easeOut(t, b, c, d) {
      const ts = (t /= d) * t;
      const tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
    }
  
    // Function to determine the prize
    function getPrize() {
      const degrees = (currentRotation * 180 / Math.PI) % 360; // Convert radians to degrees and modulo 360
      const arc = 360 / numSegments; // The arc for each segment
      // Adjust the degrees so that 0 is at the top of the wheel (where the arrow points)
      const adjustedDegrees = (360 - degrees) % 360; 
      const index = Math.floor(adjustedDegrees / arc);
      return segments[index].label;
    }
  
    // Spin button event listener
    spinButton.addEventListener('click', function() {
      let duration = 5000; // Duration of spin in milliseconds
      let start = null;
      let spins = Math.random() * 10 + 5; // Random number of spins between 5 and 15
  
      function rotate(timestamp) {
        if (!start) start = timestamp;
        const delta = timestamp - start;
        if (delta < duration) {
          const ease = easeOut(delta, 0, 1, duration);
          currentRotation = (spins * 2 * Math.PI * ease) % (Math.PI * 2);
          drawWheel();
          drawArrow(); // Draw the arrow on top of the wheel
          window.requestAnimationFrame(rotate);
        } else {
          // Ensuring the animation stops at the correct angle
          currentRotation = ((Math.floor(currentRotation / (2 * Math.PI)) + 1) * 2 * Math.PI) - (index * segmentAngle) - (segmentAngle / 2);
          drawWheel();
          drawArrow();
          const prize = getPrize();
          alert("Congratulations! You won " + prize + "!");
        }
      }
      
      // Start spinning
      window.requestAnimationFrame(rotate);
      
      setTimeout( function() { 
        window.location = "leaderboardform.html" + window.location.search;
      }, 7000);
      
    });
  
    // Initial draw
    var urlParams = new URLSearchParams(window.location.search);
    var bill = urlParams.get('bill');
    let title = this.getElementById("title");
    title.innerHTML = `Thank you for spending $${bill}!`;
    drawWheel();
    drawArrow();
});

  

/*
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin-button');
    const segments = [
      { label: 'Free necklace', color: '#f8e352' },
      { label: '10% off', color: '#f6a935' },
      { label: 'Free shipping', color: '#28a745' },
      { label: '5% off', color: '#dc3545' },
      { label: 'Free socks', color: '#6f42c1' },
      { label: '15% off', color: '#007bff' }
    ];
    const numSegments = segments.length;
    const segmentAngle = Math.PI * 2 / numSegments;
    let currentRotation = 0; // Current rotation angle in radians
    let spinTimeout = null;
    const radius = canvas.width / 2;
  
    // Utility function to draw the wheel
    function drawWheel() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      segments.forEach((segment, index) => {
        ctx.beginPath();
        ctx.fillStyle = segment.color;
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, index * segmentAngle + currentRotation, (index + 1) * segmentAngle + currentRotation);
        ctx.lineTo(radius, radius);
        ctx.fill();
  
        // Draw text
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(index * segmentAngle + segmentAngle / 2 + currentRotation);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "20px Helvetica, Arial, sans-serif";
        ctx.fillText(segment.label, radius - 10, 10);
        ctx.restore();
      });
    }
  
    // Animation ease out function for smooth spinning
    function easeOut(t, b, c, d) {
      const ts = (t /= d) * t;
      const tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
    }
  
    // Function to determine the prize based on the final angle of rotation
function getPrize() {
    const degrees = (currentRotation * 180 / Math.PI) % 360; // Convert radians to degrees and modulo 360
    const arc = 360 / numSegments; // The arc for each segment
    let adjustedDegrees = (360 - degrees + arc / 2) % 360; // Adjust degrees so that 0 is at the top of the wheel
  
    // Determine the winning segment based on the adjusted degrees
    const index = Math.floor(adjustedDegrees / arc);
    return segments[index].label;
  }
  
  // Spin button event listener
  spinButton.addEventListener('click', function() {
    let duration = 5000; // Duration of spin in milliseconds
    let start = null;
    let spins = Math.random() * 10 + 5; // Random number of spins between 5 and 15
  
    function rotate(timestamp) {
      if (!start) start = timestamp;
      const delta = timestamp - start;
      if (delta < duration) {
        const ease = easeOut(delta, 0, 1, duration);
        currentRotation = (spins * 2 * Math.PI * ease) % (Math.PI * 2);
        drawWheel();
        window.requestAnimationFrame(rotate);
      } else {
        // Ensuring the animation stops at the correct angle
        currentRotation = (spins * 2 * Math.PI) % (Math.PI * 2);
        drawWheel();
        const prize = getPrize();
        alert("Congratulations! You won " + prize + "!");
      }
    }
  
    // Start spinning
    window.requestAnimationFrame(rotate);
  });
  
  // Initial draw
  drawWheel();
  
});

*/
  
  

  

  

/* old code
const spinButton = document.getElementById('spin-button');
    const prizeDisplay = document.getElementById('prize-display');
    const totalCartValue = 50; // Replace with actual cart value

    // Prizes and their corresponding wheel slices (in degrees)
    const prizes = {
      '$50+': {
        prizes: ['Free necklace', '10% off', 'Free shipping'],
        slices: [120, 120, 60],
      },
      '$25-49': {
        prizes: ['5% off', 'Free socks', 'Mystery discount'],
        slices: [150, 90, 60],
      },
      'Below $25': {
        prizes: ['Free sticker', '10% off next purchase'],
        slices: [180, 60],
      },
    };

    // Get prize category based on cart value
    let prizeCategory;
    if (totalCartValue >= 50) {
      prizeCategory = '$50+';
    } else if (totalCartValue >= 25) {
      prizeCategory = '$25-49';
    } else {
      prizeCategory = 'Below <span class="math-inline">25';
    }

// Spin functionality
let angle = 0;
spinButton.addEventListener('click', () => {
    // Calculate a new angle for the spin, ensuring at least one full rotation
    let newAngle = angle + 360 + (Math.floor(Math.random() * 360) + 720); // Adding at least two full rotations
    document.getElementById('wheel').style.transform = `rotate(${newAngle}deg)`;
    angle = newAngle; // Update the stored angle for the next spin

  // Update the wheel's transform property to the new angle
  let wheel = document.getElementById('wheel');
  wheel.style.transition = 'transform 4s ease-out'; // Set a transition to make the spin visible
  wheel.style.transform = `rotate(${newAngle}deg)`;

  // Set a timeout to allow the spin animation to complete before calculating the prize
  setTimeout(() => {
    // Calculate winning slice after the wheel stops spinning
    let currentSlice = 0;
    let spinDegrees = newAngle % 360; // Get the actual degrees (0-359) after spinning
    for (let i = 0; i < prizes[prizeCategory].slices.length; i++) {
      currentSlice += prizes[prizeCategory].slices[i];
      if (spinDegrees <= currentSlice) { // Use <= for inclusive comparison
        prizeDisplay.innerHTML = `Congratulations! You won a ${prizes[prizeCategory].prizes[i]}!`;
        break;
      }
    }
  }, 4000); // The timeout should match the duration of the spin animation
});
*/



