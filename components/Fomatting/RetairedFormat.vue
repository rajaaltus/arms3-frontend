<template>
  <div>
    <h4 style="font-family: Calibri; font-style: normal;"><b>4. DETAILS OF DEPARTMENTAL STAFF</b></h4>
    <h4 style="font-family: Calibri; font-style: normal;"><b>B. A. List of Faculty and staff served NIMHANS and Superannuated / Resigned / VRS</b></h4>
    <table>
      <tr>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Superannuated / Resigned / VRS</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Name of the Official and Designation</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Date of Leaving</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Image</b>&nbsp;</th>
      </tr>
      <tr v-for="(rd, index) in retaired" :key="index">
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ rd.faculty_status }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ rd.faculty_name }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ rd.leaving_date }}&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;"><img width="250" height="200" v-if="rd.image" :src="`${$axios.defaults.baseURL}${rd.image.url}`" alt="ianmge" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["retaired"],
};
</script>
