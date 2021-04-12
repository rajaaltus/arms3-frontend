<template>
  <div>
    <center>
      <h2>NATIONAL INSTITUTE OF MENTAL HEALTH &amp; NEUROSCIENCES</h2>
      <h3>Bengaluru – 560029</h3>
      <h2>Period of the report:1st April {{ $store.state.selectedYear }} to 31st March {{ $store.state.selectedYear + 1 }}</h2>
    </center>
    <h1>
      <b><u>Section A:</u></b>
    </h1>
    <h3>1. ABOUT THE DEPARTMENT</h3>
    <h3>A. Introduction: Specifically indicate the recognition / contribution of the Department during the year to policies, planning and programmes at State / National and International levels.</h3>
    <p>{{ aboutData.introduction }}</p>
    <h3>B. New facilities developed: New initiatives taken up by the Department(s) within NIMHANS during the year.</h3>
    <p>{{ aboutData.facilities }}</p>
  </div>
</template>

<script>
export default {
  props: ["aboutData"],
};
</script>
