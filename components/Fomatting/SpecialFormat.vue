<template>
  <div>
    <h3>D. Special Clinics / Services / Procedures</h3>
    <table>
      <tr>
        <th style="border: 1px solid #dddddd;">Special Services</th>
        <th style="border: 1px solid #dddddd;">New Patients</th>
        <th style="border: 1px solid #dddddd;">Follow-up Patients</th>
        <th style="border: 1px solid #dddddd;">Referrals</th>
        <th style="border: 1px solid #dddddd;">Description</th>
      </tr>
      <tr v-for="(sd, index) in specialData" :key="index">
        <td style="border: 1px solid #dddddd;">{{ sd.service_name }}</td>
        <td style="border: 1px solid #dddddd;">{{ sd.new_patients }}</td>
        <td style="border: 1px solid #dddddd;">{{ sd.followup_patients }}</td>
        <td style="border: 1px solid #dddddd;">{{ sd.referrals }}</td>
        <td style="border: 1px solid #dddddd;">{{ sd.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["specialData"],
};
</script>
