var app = new function() {

    this.el = document.getElementById('produkty');
  
  
    this.tablica = new Array();

    this.Count = function(tab) {
      var el   = document.getElementById('counter');
      var cnt = 0;
      tab.forEach(element => {
        cnt+=element.suma
      });
  
        el.innerHTML = 'Razem:  ' + Math.round(cnt*100)/100;

    };
    
    this.FetchAll = function() {
      var data = '';
  
      if (this.tablica.length > 0) {
        for (i = 0; i < this.tablica.length; i++) {
          data += '<tr>';
          data += '<td>' + this.tablica[i].nazwa + '</td>';
          data += '<td>' + this.tablica[i].ilosc + '</td>';
          data += '<td>' + this.tablica[i].cena + '</td>';
          data += '<td>' + this.tablica[i].suma + '</td>';
          data += '<td><button onclick="app.Edit(' + i + ')">Edytuj</button></td>';
          data += '<td><button onclick="app.Delete(' + i + ')">Usuń</button></td>';
          data += '</tr>';
        }
      }
  
      this.Count(this.tablica);
      return this.el.innerHTML = data;
    };
  
    this.Add = function () {
      el = document.getElementById('add-name');
      qty = document.getElementById('add-qty');
      prc = document.getElementById('add-prc');

      // Get the value
      var product = el.value;
      var ilosc = qty.value;
      var cena = Math.round(prc.value*100)/100;
      var suma = Math.round(ilosc*cena*100)/100;


  
      if (product) {
        // Add the new value
        var pozycja = {
            lp: this.tablica.length+1,
            nazwa: product,
            ilosc: ilosc,
            cena: cena,
            suma: suma
        }
        this.tablica.push(pozycja);
        // Reset input value
        el.value = '';
        qty.value= '';
        prc.value= '';

        // Dislay the new list
        this.FetchAll();
      }
    };
  
    this.Edit = function (item) {
      var el = document.getElementById('edit-name');
      var qty = document.getElementById('edit-qty');
      var prc = document.getElementById('edit-prc');


      // Display value in the field
      el.value = this.tablica[item].nazwa;
      qty.value = this.tablica[item].ilosc;
      prc.value = this.tablica[item].cena;


      // Display fields
      document.getElementById('spoiler').style.display = 'block';
      self = this;
  
      document.getElementById('saveEdit').onsubmit = function() {
        // Get value
        var pozycja = {
        nazwa: el.value,
        ilosc: qty.value,
        cena: prc.value,
        suma: qty.value*prc.value
        }
  
        if (pozycja) {
          // Edit value
          self.tablica.splice(item, 1, pozycja);
          // Display the new list
          self.FetchAll();
          // Hide fields
          CloseInput();
        }
      }
    };
  
    this.Delete = function (item) {
      // Delete the current row
      this.tablica.splice(item, 1);
      // Display the new list
      this.FetchAll();
    };
    
  }
  
  app.FetchAll();
  
  function CloseInput() {
    document.getElementById('spoiler').style.display = 'none';
  }
