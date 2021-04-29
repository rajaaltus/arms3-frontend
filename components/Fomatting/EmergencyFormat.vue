<template>
  <div>
    <table>
      <tr>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Emergency Services</b>&nbsp;</th>
        <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>No. of Patients / Cases</b>&nbsp;</th>
      </tr>
      <tr>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Registrations&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ emergencyData.reduce((sum, item) => sum + item.registrations, 0) }}&nbsp;</td>
      </tr>
      <tr>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Admissions&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ emergencyData.reduce((sum, item) => sum + item.admissions, 0) }}&nbsp;</td>
      </tr>
      <tr>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Deaths&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ emergencyData.reduce((sum, item) => sum + item.deaths, 0) }}&nbsp;</td>
      </tr>
      <tr>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;External Reference&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ emergencyData.reduce((sum, item) => sum + item.external_ref, 0) }}&nbsp;</td>
      </tr>
      <tr>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Internal Reference&nbsp;</td>
        <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ emergencyData.reduce((sum, item) => sum + item.internal_ref, 0) }}&nbsp;</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["emergencyData"],
};
</script>
