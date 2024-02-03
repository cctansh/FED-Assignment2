document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas.getContext('2d');
  const spinButton = document.getElementById('spin-button');
  const prizeModal = document.getElementById('prizeModal');
  const prizeText = document.getElementById('prizeText');
  const closeButton = document.querySelector('.close-button'); // Ensure this selector matches your HTML

  const segments = [
      { label: 'Free necklace', color: '#f8e352' },
      { label: '10% off', color: '#f6a935' },
      { label: 'Free shipping', color: '#28a745' },
      { label: '5% off', color: '#dc3545' },
      { label: 'Free socks', color: '#6f42c1' },
      { label: '15% off', color: '#007bff' }
  ];
  const numSegments = segments.length;
  const segmentAngle = (2 * Math.PI) / numSegments;
  let currentRotation = 0;
  const radius = canvas.width / 2;
  let finalRotation;

  function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Use `finalRotation` if it's defined; otherwise, fall back to `currentRotation`.
    let rotation = typeof finalRotation !== 'undefined' ? finalRotation : currentRotation;
    segments.forEach((segment, index) => {
        ctx.beginPath();
        ctx.fillStyle = segment.color;
        ctx.moveTo(radius, radius);
        // Important: Use `rotation` here instead of `currentRotation` directly
        ctx.arc(radius, radius, radius, index * segmentAngle + rotation, (index + 1) * segmentAngle + rotation);
        ctx.lineTo(radius, radius);
        ctx.fill();

        ctx.save();
        ctx.translate(radius, radius);
        // And here as well
        ctx.rotate(index * segmentAngle + segmentAngle / 2 + rotation);
        ctx.textAlign = "right";
        ctx.fillStyle = "white";
        ctx.font = "20px Helvetica, Arial, sans-serif";
        ctx.fillText(segment.label, radius - 10, 10);
        ctx.restore();
    });
}

  function drawArrow() {
    ctx.fillStyle = 'black';
    // Calculate the center of the right edge of the wheel
    const arrowBaseX = radius + radius; // This should place it at the right edge, centered vertically
    const arrowBaseY = radius; // Center of the canvas vertically

    // Arrow pointing towards the center, adjust size as needed
    const arrowHeight = 20; // Adjust the height of the arrow if needed
    const arrowWidth = 15; // Adjust the width of the arrow if needed

    ctx.beginPath();
    ctx.moveTo(arrowBaseX - arrowHeight, arrowBaseY - arrowWidth); // Top point of the arrow
    ctx.lineTo(arrowBaseX - arrowHeight, arrowBaseY + arrowWidth); // Bottom point of the arrow
    ctx.lineTo(arrowBaseX, arrowBaseY); // Tip of the arrow pointing towards the center
    ctx.closePath();
    ctx.fill();
}




function getPrizeIndex() {
  // Convert the current rotation into a segment index.
  // This assumes the wheel's segments are evenly distributed and the wheel spins clockwise.
  const degreesPerSegment = 360 / numSegments;
  const totalDegreesRotated = (currentRotation * (180 / Math.PI)) % 360;
  let prizeIndex = Math.floor(totalDegreesRotated / degreesPerSegment);

  // Adjust if the segments are defined in a counter-clockwise manner
  prizeIndex = numSegments - prizeIndex - 1;

  // Ensure the index is within bounds
  prizeIndex = prizeIndex % numSegments;
  return prizeIndex;
}



spinButton.addEventListener('click', function() {
  let spinTime = 0;
  // Resets finalRotation at the start of each spin
  finalRotation = undefined; 
  const spins = Math.random() * 10 + 5; // Random number of full spins
  const spinDuration = Math.random() * 3000 + 2000; // Between 2 and 5 seconds

    function rotateWheel(timestamp) {
      if (!spinTime) spinTime = timestamp;
      const progress = timestamp - spinTime;
      if (progress < spinDuration) {
          const easeOutSpin = 1 - Math.pow(1 - (progress / spinDuration), 4);
          finalRotation = easeOutSpin * spins * 2 * Math.PI;
          drawWheel(); 
          drawArrow();
          requestAnimationFrame(rotateWheel);
      } else {
          // Lock in the final rotation
          currentRotation = finalRotation % (2 * Math.PI);
          drawWheel(currentRotation); // Redraw one last time with the final rotation

          // Calculate the prize based on the locked-in final rotation
          const prizeIndex = getPrizeIndex();
          prizeText.textContent = `Congratulations! You won: ${segments[prizeIndex].label}`;
          prizeModal.style.display = "block";
      }
  }
    

      requestAnimationFrame(rotateWheel);
  });

  closeButton.addEventListener('click', function() {
      prizeModal.style.display = "none";
  });

  window.addEventListener('click', function(event) {
      if (event.target == prizeModal) {
          prizeModal.style.display = "none";
      }
  });

  
  drawWheel();
  drawArrow();
  
});
