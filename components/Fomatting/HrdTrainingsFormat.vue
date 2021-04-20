<template>
  <div>
    <h3>B. Faculty/staff/students from other institutions trained at NIMHANS</h3>
    <table>
      <tr>
        <th style="border: 1px solid #dddddd;">Name of the course / Training</th>
        <th style="border: 1px solid #dddddd;">Institutional affiliation</th>
        <th style="border: 1px solid #dddddd;">Number of Candidates</th>
        <th style="border: 1px solid #dddddd;">From</th>
        <th style="border: 1px solid #dddddd;">To</th>
        <th style="border: 1px solid #dddddd;">Status</th>
        <th style="border: 1px solid #dddddd;">Description</th>
      </tr>
      <tr v-for="(hrdTraining, index) in hrdTrainings" :key="index">
        <td style="border: 1px solid #dddddd;">{{ hrdTraining.training_name }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrdTraining.institutional_affiliation }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrdTraining.no_of_candidates }} Years</td>
        <td style="border: 1px solid #dddddd;">{{ hrdTraining.from_date }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrdTraining.to_date }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrdTraining.remarks_status }}</td>
        <td style="border: 1px solid #dddddd;">{{ hrdTraining.brief_report }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["hrdTrainings"],
};
</script>
