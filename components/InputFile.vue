<script setup>
  import { fileStatus } from '~/utils/constans';

  const statusText = ref('');
  const statusClass = ref('request__status--loading');
  const selectedFile = ref(null);
  const { fetchAverages } = useFetchAverages();

  const uploadFile = async (e) => {
    e.preventDefault();
  
    statusText.value = fileStatus.PROCESSING;
  
    const body = new FormData();
    body.append('file', selectedFile.value, selectedFile.value.name);
  
    await $fetch('/api/averages', {
      method: 'POST',
      body,
    }).catch((error) => {
      statusText.value = fileStatus.ERROR;
      statusClass.value = 'request__status--error';
    });

    statusText.value = fileStatus.SAVED;
    statusClass.value = 'request__status--success';
    
    fetchAverages();
  }

  const onSelectFile = ({ target }) => {
    if (!target.files.length) return;
    selectedFile.value = target.files[0];
  }

  const showStatusText = computed(() => {
    return !!statusText.value;
  })
</script>

<template>
  <form class="form">
    <p class="form__description">
      Selecciona un archivo de tipo .txt y podras ver su información
      representada en la tabla.
    </p>
    <div class="form__actions">
      <div class="form__control">
        <label for="file">Subir archivo: </label>
        <input id="file" type="file" accept=".txt" @change="onSelectFile" />
      </div>
      <div class="btn__container">
        <button class="btn btn--primary" @click="uploadFile">Aceptar</button>
      </div>
    </div>
  </form>

  <div class="request" v-if="showStatusText">
    <p class="request__status" :class="statusClass">{{ statusText }}</p>
  </div>
</template>