<template>
  <div>
    <h3>4. DETAILS OF DEPARTMENTAL STAFF</h3>
    <h3>B. A. List of Faculty and staff served NIMHANS and Superannuated / Resigned / VRS</h3>
    <table>
      <tr>
        <th style="border: 1px solid #dddddd;">Superannuated / Resigned / VRS</th>
        <th style="border: 1px solid #dddddd;">Name of the Official and Designation</th>
        <th style="border: 1px solid #dddddd;">Date of Joining</th>
        <th style="border: 1px solid #dddddd;">Date of Leaving</th>
        <th style="border: 1px solid #dddddd;">Image URL</th>
      </tr>
      <tr v-for="(rd, index) in retaired" :key="index">
        <td style="border: 1px solid #dddddd;">{{ rd.faculty_status }}</td>
        <td style="border: 1px solid #dddddd;">{{ rd.faculty_name }}</td>
        <td style="border: 1px solid #dddddd;"></td>
        <td style="border: 1px solid #dddddd;">{{ rd.leaving_date }}</td>
        <td style="border: 1px solid #dddddd;">{{ rd.image ? this.retaired[i].image : "" }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["retaired"],
};
</script>
