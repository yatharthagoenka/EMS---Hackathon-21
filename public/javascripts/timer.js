(function() {

    function clear(ctx) { ctx.clearRect(0, 0, 80, 80); }
    
    function setTrack(ctx) {
      ctx.strokeStyle = 'hsla(2, 8%, 46%, 0.45)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(36, 36, 27, 0, Math.PI*2);
      ctx.stroke();
    }
    
    function setTime(ctx, until, now, total) {
      ctx.strokeStyle = 'hsl(2, 8%, 46%)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(
        36,
        36,
        27,
        Math.PI/-2,
        ( Math.PI * 2 ) * ( ( until - now % total ) / total ) + ( Math.PI / -2 ),
        false
      );
      ctx.stroke();
    }
    
    function numberOfDays(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    }
    
    var mo = document.getElementById('months').getContext('2d'),
      d = document.getElementById('days').getContext('2d'),
      h = document.getElementById('hours').getContext('2d'),
      mi = document.getElementById('minutes').getContext('2d'),
      s = document.getElementById('seconds').getContext('2d'),
      ms = document.getElementById('milliseconds').getContext('2d'),
      grad = new Date(2015, 3, 16, 17, 0, 0, 0, 0),
      monthDays = {
        cache: {},
        getTotalDaysInMonth: function(year, month) {
          if (!this.cache[year]) {
            this.cache[year] = {};
          }
          if (!this.cache[year][month]) {
            this.cache[year][month] = (new Date(year, month+1, 0)).getDate();
          }
          return this.cache[year][month];
        }
      };
    
    function set() {
    
      var today = new Date(),
        daysThisMonth = monthDays.getTotalDaysInMonth(today.getFullYear(), today.getMonth());
    
      clear(mo);
      setTrack(mo);
      setTime(mo, grad.getMonth(), today.getMonth(), 12);
    
      clear(d);
      setTrack(d);
      setTime(d, grad.getDate(), today.getDate(), daysThisMonth);
    
      clear(h);
      setTrack(h);
      setTime(h, grad.getHours(), today.getHours(), 24);
    
      clear(mi);
      setTrack(mi);
      setTime(mi, grad.getMinutes(), today.getMinutes(), 60);
    
      clear(s);
      setTrack(s);
      setTime(s, grad.getSeconds(), today.getSeconds(), 60);
    
      clear(ms);
      setTrack(ms);
      setTime(ms, grad.getMilliseconds(), today.getMilliseconds(), 1000);
    
      requestAnimationFrame(set);
    
    }
    
    requestAnimationFrame(set);
    
    })();