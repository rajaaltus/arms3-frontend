<template>
  <div>
    <h3>E. OT & Other Procedures</h3>
    <table>
      <tr>
        <th style="border: 1px solid #dddddd;">Procedure Name</th>
        <th style="border: 1px solid #dddddd;">Classification</th>
        <th style="border: 1px solid #dddddd;">No of Patients</th>
        <th style="border: 1px solid #dddddd;">Description</th>
      </tr>
      <tr v-for="(od, index) in otservicesData" :key="index">
        <td style="border: 1px solid #dddddd;">{{ od.Procedure }}</td>
        <td style="border: 1px solid #dddddd;">{{ od.classification }}</td>
        <td style="border: 1px solid #dddddd;">{{ od.no_of_patients }}</td>
        <td style="border: 1px solid #dddddd;">{{ od.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["otservicesData"],
};
</script>
