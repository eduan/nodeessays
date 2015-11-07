var Cromossomo = function(genes){
    if(genes)
        this.genes = genes;
    this.custo = 10000;    
};

Cromossomo.prototype.genes = '';

Cromossomo.prototype.random = function(tamanho){
    this.genes = '';
    while(tamanho--){
        this.genes += String.fromCharCode(Math.floor(Math.random()*255))
    }
}
 
Cromossomo.prototype.calcularCusto = function(ideal){
    var total = 0;
    for (var i = 0; i < this.genes.length; i++) {
        total += (this.genes.charCodeAt(i) - ideal.charCodeAt(i)) * (this.genes.charCodeAt(i) - ideal.charCodeAt(i));
    }
    this.custo = total;
}
 
Cromossomo.prototype.acasalar = function(CromossomomoPar){    
    var pivot = Math.round(this.genes.length / 2) - 1;
    var primeiroFilho = CromossomomoPar.genes.substr(0,pivot) + this.genes.substr(pivot);
    var segundoFilho = this.genes.substr(0,pivot) + CromossomomoPar.genes.substr(pivot);
    return [new Cromossomo(primeiroFilho), new Cromossomo(segundoFilho)];
}
 
Cromossomo.prototype.mutar = function(probabilidade){
    if(Math.random() > probabilidade)
        return;
    var index = Math.floor(Math.random() * this.genes.length);
    var visinho = Math.random() <= 0.5 ? -1 : 1;
    var novoGene = String.fromCharCode(this.genes.charCodeAt(index) + visinho);
    var novoCromossomomo = '';
    for (i = 0; i < this.genes.length; i++) {
        if (i == index) novoCromossomomo += novoGene;
        else novoCromossomomo += this.genes[i];
    }
    this.genes = novoCromossomomo;
}
 
var Populacao = function(objetivo, tamanho){
    this.membros = [];
    this.objetivo = objetivo;
    this.geracao = 0;
    while(tamanho--){
        var cromossomo = new Cromossomo();
        cromossomo.random(this.objetivo.length);
        this.membros.push(cromossomo);
    }
}

Populacao.prototype.visualizar = function() {
    console.log('Geracao nº' + this.geracao)
    for(var i in this.membros){
        console.log(this.membros[i].genes + '(' + this.membros[i].custo + ')' + '(' + this.membros[i].genes.length + ')');
    }
};

Populacao.prototype.sort = function() {
    this.membros.sort(function(a, b) {
        return a.custo - b.custo;
    });
}

Populacao.prototype.gerar = function(){
    for(var i in this.membros){
        this.membros[i].calcularCusto(this.objetivo);
    }
    this.sort();
    this.visualizar();
    var filhos = this.membros[0].acasalar(this.membros[1]);
    this.membros.splice(this.membros.length - 2, 2, filhos[0], filhos[1]);

    for(var j in this.membros){
        this.membros[j].mutar(0.5);
        this.membros[j].calcularCusto(this.objetivo);
        if(this.membros[j].genes == this.objetivo){
            this.sort();
            this.visualizar();
            return true;
        }
    }    
    this.geracao++;
    var escopo = this;
    setTimeout(function() { escopo.gerar(); } , 20);
}

var p =  new Populacao("Quero ver evoluir até aqui!", 20)
p.gerar()
