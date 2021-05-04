<template>
  <div>
    <!-- <center>
      <h2>NATIONAL INSTITUTE OF MENTAL HEALTH &amp; NEUROSCIENCES</h2>
      <h3>Bengaluru – 560029</h3>
      <h2>Period of the report:1st April {{ $store.state.selectedYear }} to 31st March {{ $store.state.selectedYear + 1 }}</h2>
    </center> -->
    <h2 style="font-family: Calibri; font-style: normal;">
      <b><u>Section A:</u></b>
    </h2>
    <h4 style="font-family: Calibri; font-style: normal;"><b>1. ABOUT THE DEPARTMENT</b></h4>
    <h4 style="font-family: Calibri; font-style: normal;"><b>A. Introduction: Specifically indicate the recognition / contribution of the Department during the year to policies, planning and programmes at State / National and International levels.</b></h4>
    <p v-html="aboutData && aboutData.introduction"></p>
    <h4 style="font-family: Calibri; font-style: normal;"><b>B. New facilities developed: New initiatives taken up by the Department(s) within NIMHANS during the year.</b></h4>
    <p v-html="aboutData && aboutData.facilities && aboutData.facilities"></p>
  </div>
</template>

<script>
export default {
  props: ["aboutData"],
};
</script>
