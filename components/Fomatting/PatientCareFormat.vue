<template>
  <div>
    <table>
      <thead>
        <tr>
          <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>Clinical Services</b>&nbsp;</th>
          <th style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;<b>No. of Patients / Cases</b>&nbsp;</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Screenings&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.screenings, 0) }}&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Registrations&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.registrations, 0) }}&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Follow-Ups&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.followups, 0) }}&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Admissions&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.admissions, 0) }}&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Discharges&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.discharges, 0) }}&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Deaths&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.deaths, 0) }}&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Emergencies&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.emergencies, 0) }}&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;External Reference&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.external_ref, 0) }}&nbsp;</td>
        </tr>
        <tr>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;Internal Reference&nbsp;</td>
          <td style="font-family: Calibri; font-style: normal; border: 1px solid #dddddd;">&nbsp;{{ clinicalData.reduce((sum, item) => sum + item.internal_ref, 0) }}&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["clinicalData"],
};
</script>
