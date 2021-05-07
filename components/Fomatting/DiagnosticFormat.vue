<template>
  <div>
    <table>
      <tr>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Sl.No</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Lab Services</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Total No.Of Samples Analyzed</b>&nbsp;</th>
      </tr>
      <tr v-for="(dd, index) in diagnosticsData" :key="index">
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ index+1 }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ dd.pc_diagnostic_test && dd.pc_diagnostic_test.test_name }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ dd.samples_analyzed && dd.samples_analyzed }}&nbsp;</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["diagnosticsData"],
};
</script>
