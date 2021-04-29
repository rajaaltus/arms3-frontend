<template>
  <div>
    <h4 style="font-family: Calibri; font-style: normal;">B. Faculty/staff/students from other institutions trained at NIMHANS</h4>
    <table>
      <tr>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Name of the course / Training</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Institutional affiliation</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Number of Candidates</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>From</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>To</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Status</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Description</b>&nbsp;</th>
      </tr>
      <tr v-for="(hrdTraining, index) in hrdTrainings" :key="index">
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrdTraining.training_name }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrdTraining.institutional_affiliation }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrdTraining.no_of_candidates }} Years&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrdTraining.from_date }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrdTraining.to_date }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrdTraining.remarks_status }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ hrdTraining.brief_report }}&nbsp;</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["hrdTrainings"],
};
</script>
