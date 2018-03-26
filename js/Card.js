// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;
	
	this.columnId = columnId;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardRenameBtn = $('<button class="btn-rename-card">Rename</button>')
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardRenameBtn.click(function(){
			self.renameCard();
		})
		
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		card.append(cardRenameBtn)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
		  url: baseUrl + '/card/' + self.id,
		  method: 'DELETE',
		  success: function(){
			self.element.remove();
		  }
		});
	},

	renameCard: function() {
		var self = this;
		var cardName = prompt("Enter the name of the card");
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				name: cardName,
				bootcamp_kanban_column_id: self.columnId
			},
			success: function(){
				var cardDescription = $(self.element[0].childNodes[1]);
				cardDescription.text(cardName);
			}
		})
	}
}
