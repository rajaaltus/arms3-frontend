<template>
  <div>
    <table>
      <tr>
        <th style="border: 1px solid #dddddd;">Emergency Services</th>
        <th style="border: 1px solid #dddddd;">No.Of Patients /Cases</th>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd;">Registrations</td>
        <td style="border: 1px solid #dddddd;">{{ emergencyData.reduce((sum, item) => sum + item.registrations, 0) }}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd;">Admissions</td>
        <td style="border: 1px solid #dddddd;">{{ emergencyData.reduce((sum, item) => sum + item.admissions, 0) }}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd;">Deaths</td>
        <td style="border: 1px solid #dddddd;">{{ emergencyData.reduce((sum, item) => sum + item.deaths, 0) }}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd;">External Reference</td>
        <td style="border: 1px solid #dddddd;">{{ emergencyData.reduce((sum, item) => sum + item.external_ref, 0) }}</td>
      </tr>
      <tr>
        <td style="border: 1px solid #dddddd;">Internal Reference</td>
        <td style="border: 1px solid #dddddd;">{{ emergencyData.reduce((sum, item) => sum + item.internal_ref, 0) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["emergencyData"],
};
</script>
