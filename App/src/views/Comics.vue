<script>

import CryptoJS from 'crypto-js';

export default {
    components: {
        CryptoJS
    },
    data () {
        return {
            comics: [],
            publicKey: '1edb3cc6a7d1fa250b607e1c0e37c09e',
            privateKey: '64b48d27c5ee0629f8e2833a3eb5bd25bc438795',
            timestamp: new Date().getTime().toString(),
            ComicsCharacters: [],
            offset: 0
        }
    },
    methods: {
        getComics () {
            let hash = CryptoJS.MD5(this.timestamp + this.privateKey + this.publicKey).toString();
            fetch(`http://gateway.marvel.com/v1/public/comics?offset=${this.offset}&ts=${this.timestamp}&apikey=${this.publicKey}&hash=${hash}`)
            .then( response => {
                response.json()
                .then(result => {
                    console.log(result)
                    if (result.data.total == this.comics.length) {
                        return 'Todos os comics já foram carregados.';
                    }
                    result.data.results.forEach(element => {
                        this.comics.push(element);
                    });
                }) 
            })
        },

        btnMostrarMais() {
            this.offset = this.offset + 20;
            this.getComics()
        }
    },
    mounted: function () {
        this.getComics();
    }
}

</script>

<template>

    <div class="row comics">
        <div v-for="comic in this.comics" class="card col-3" style="padding: 20px; margin: 5px;">
            <img class="card-img-top" :src="comic.thumbnail.path +'.'+ comic.thumbnail.extension" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{comic.title.toUpperCase()}}</h5>
                <p class="card-text" v-html="comic.description"></p>
                <p><strong>Numero de páginas: {{ comic.pageCount == 0 ? 'Não Informado' : comic.pageCount }}</strong></p>
            </div>
        </div>
    </div>

    <div class="text-center" style="padding: 20px;">
        <button type="button" @click="btnMostrarMais()" class="btn btn-primary">Mostrar mais</button>
    </div>

</template>

<style>

.comics {
    display: flex;
    justify-content: center;
}

</style>
