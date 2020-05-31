   window.addEventListener('keydown', function(e) {

       const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
       const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
       if (!audio) return;
       audio.currentTime = 0;
       audio.play();
       key.classList.add('playing');

   });

   //removing transition after cheching the prop that takes longest to end 

   function removetrans(e) {
       if (e.propertyName !== "box-shadow") return;
       this.classList.remove('playing');
   }

   const keys = document.querySelectorAll('.key');
   keys.forEach(key => key.addEventListener('transitionend', removetrans));