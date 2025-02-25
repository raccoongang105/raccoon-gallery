document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('raccoonCanvas');
    const ctx = canvas.getContext('2d');
    const generateBtn = document.getElementById('generate');
    const tweetBtn = document.getElementById('tweet');
  
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Loading model...', 140, 200);
  
    let generator;
    async function loadModel() {
      try {
        if (typeof transformers === 'undefined') throw new Error('Transformers not loaded');
        generator = await transformers.pipeline('text-to-image', 'amused/amused-256');
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillText('Model ready! Click to forge.', 120, 200);
      } catch (e) {
        console.error('Model load failed:', e);
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillText('Model failed—check console!', 100, 200);
      }
    }
    loadModel();
  
    async function drawRaccoon(handle, fur, prop) {
      ctx.clearRect(0, 0, 400, 400);
      ctx.fillStyle = '#ccc';
      ctx.fillRect(0, 0, 400, 400);
      ctx.fillStyle = '#000';
      ctx.fillText('Generating raccoon...', 120, 200);
  
      if (generator) {
        try {
          const prompt = `${fur} raccoon with ${prop}`;
          console.log('Generating:', prompt);
          const img = await generator(prompt, { width: 256, height: 256 });
          ctx.drawImage(img, 0, 0, 400, 400);
  
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
          ctx.font = 'bold 24px Arial';
          ctx.fillStyle = 'white';
          ctx.fillText(handle || '@RaccoonGang', 50, 350);
          ctx.shadowBlur = 0;
        } catch (e) {
          console.error('Generation failed:', e);
          ctx.fillText('Oops, generation failed!', 100, 240);
        }
      } else {
        ctx.fillText('Model not loaded yet!', 120, 240);
      }
    }
  
    generateBtn.addEventListener('click', () => {
      const handle = document.getElementById('handle').value;
      const fur = document.getElementById('fur').value;
      const prop = document.getElementById('prop').value;
      drawRaccoon(handle, fur, prop);
    });
  
    tweetBtn.addEventListener('click', () => {
      const imgData = canvas.toDataURL('image/png');
      const tweetText = encodeURIComponent('Forged my raccoon avatar at Raccoon Gang Gallery! [your-link]/avatar-forge.html #RaccoonGang');
      window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
    });
  });