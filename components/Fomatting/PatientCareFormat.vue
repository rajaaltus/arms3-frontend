<template>
  <div>
    <table>
      <thead>
        <tr>
          <th style="border: 1px solid #dddddd;">Clinical Services</th>
          <th style="border: 1px solid #dddddd;">No. of Patients / Cases</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style="border: 1px solid #dddddd;">Screenings</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.screenings, 0) }}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd;">Registrations</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.registrations, 0) }}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd;">followups</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.followups, 0) }}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd;">Admissions</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.admissions, 0) }}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd;">Discharges</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.discharges, 0) }}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd;">Deaths</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.deaths, 0) }}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd;">Emergencies</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.emergencies, 0) }}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd;">External Reference</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.external_ref, 0) }}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #dddddd;">Internal Reference</td>
          <td style="border: 1px solid #dddddd;">{{ clinicalData.reduce((sum, item) => sum + item.internal_ref, 0) }}</td>
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
