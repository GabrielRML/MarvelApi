<script>

import CryptoJS from 'crypto-js';

export default {
    components: {
        CryptoJS
    },
    data () {
        return {
            personagens: [],
            publicKey: '1edb3cc6a7d1fa250b607e1c0e37c09e',
            privateKey: '64b48d27c5ee0629f8e2833a3eb5bd25bc438795',
            timestamp: new Date().getTime().toString(),
            ComicsCharacters: [],
            offset: 0
        }
    },
    methods: {
        getPersonagens () {
            let hash = CryptoJS.MD5(this.timestamp + this.privateKey + this.publicKey).toString();
            fetch(`http://gateway.marvel.com/v1/public/characters?offset=${this.offset}&ts=${this.timestamp}&apikey=${this.publicKey}&hash=${hash}`)
            .then( response => {
                response.json()
                .then(result => {
                    if (result.data.total == this.personagens.length) {
                        return 'Todos os personagens já foram carregados.';
                    }
                    result.data.results.forEach(element => {
                        this.personagens.push(element);
                    });
                }) 
            })
        },

        getComicsCharacters (idCharacter) {
            let hash = CryptoJS.MD5(this.timestamp + this.privateKey + this.publicKey).toString();
            fetch(`http://gateway.marvel.com/v1/public/characters/${idCharacter}/comics?ts=${this.timestamp}&apikey=${this.publicKey}&hash=${hash}`)
            .then( response => {
                response.json()
                .then(result => {
                    this.ComicsCharacters = result.data.results;
                }) 
            } )
        },

        btnMostrarMais() {
            this.offset = this.offset + 20;
            this.getPersonagens()
        }
    },
    mounted: function () {
        this.getPersonagens();
    }
}

</script>

<template>

    <div class="row personagens">
        <div v-for="personagem in this.personagens" class="card col-3 text-center" style="padding: 20px; margin: 5px;">
            <img class="card-img-top" :src="personagem.thumbnail.path +'.'+ personagem.thumbnail.extension">
            <div class="card-body">
                <h5 class="card-title">{{personagem.name.toUpperCase()}}</h5>
                <p class="card-text">{{ personagem.description }}</p>
            </div>
            <div class="card-footer">
                <button type="button" @click="getComicsCharacters(personagem.id)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Comics que esse personagem apareceu</button>
            </div>
        </div>
    </div>

    <div class="text-center">
        <button type="button" @click="btnMostrarMais()" class="btn btn-primary">Mostrar mais</button>
    </div>

    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Comics que o personagem apareceu</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body row">
                <div v-for="comics in this.ComicsCharacters" class="card col-4" style="padding: 20px;">
                    <img v-if="comics.images.length > 0" class="card-img-top" :src="comics.images[0].path +'.'+ comics.images[0].extension">
                    <img v-else class="card-img-top" src="https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png">
                    <div class="card-body">
                        <h5 class="card-title">{{comics.title.toUpperCase()}}</h5>
                        <p v-html="comics.description"></p>
                        <!-- <button type="button" @click="getComicsCharacters(personagem.id)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Comics que esse personagem apareceu</button> -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
            </div>
            </div>
        </div>
    </div>

</template>

<style>

.personagens {
    display: flex;
    justify-content: center;
}

</style>
