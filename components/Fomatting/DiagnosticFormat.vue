<template>
  <div>
    <table>
      <tr>
        <th style="border: 1px solid #dddddd;">Lab Services</th>
        <th style="border: 1px solid #dddddd;">Total No.Of Samples Analyzed</th>
      </tr>
      <tr v-for="(dd, index) in diagnosticsData" :key="index">
        <td style="border: 1px solid #dddddd;">{{ dd.pc_diagnostic_test && dd.pc_diagnostic_test.test_name }}</td>
        <td style="border: 1px solid #dddddd;">{{ dd.samples_analyzed && dd.samples_analyzed }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["diagnosticsData"],
};
</script>
