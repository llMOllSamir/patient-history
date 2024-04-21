export const PersonalInformation = ({ data }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo col={2} description={data ? data.name : ""} title={"name"} />

      <ArticalInfo
        description={data ? data.national_id : ""}
        title={"National ID"}
      />

      <ArticalInfo description={data ? data.patient_code : ""} title={"code"} />

      <ArticalInfo
        description={data ? data.date_of_birth : ""}
        title={"Date of birth"}
      />

      <ArticalInfo description={data ? data.age : ""} title={"age"} />

      <ArticalInfo
        description={data ? data.marital_state : ""}
        title={"Marital status"}
      />

      <ArticalInfo description={data ? data.address : ""} title={"Address"} />

      <h2 className="text-fuchsia-900 my-10 text-2xl font-semibold md:col-span-2">
        Contact Information
      </h2>

      <ArticalInfo
        description={data ? data.phone_number : ""}
        phone={true}
        title={"Phone number"}
      />

      <ArticalInfo
        description={data ? data.email || "Not Found" : ""}
        title={"E-mail"}
      />

      <ArticalInfo
        description={data ? data.relative_phone : ""}
        phone={true}
        title={"Home number"}
      />
      <ArticalInfo
        description={data ? data.relative_name : ""}
        title={"Relative name"}
      />
    </div>
  );
};

export const GeneralExamination = ({ generalExamination }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={generalExamination ? generalExamination.height : ""}
        title={"height(cm)"}
      />

      <ArticalInfo
        description={generalExamination ? generalExamination.pulse : ""}
        title={"pulse"}
      />

      <ArticalInfo
        description={generalExamination ? generalExamination.weight : ""}
        title={"wight"}
      />

      <ArticalInfo
        description={
          generalExamination ? generalExamination.random_blood_sugar : ""
        }
        title={"random blood sugar"}
      />

      <ArticalInfo
        description={
          generalExamination ? generalExamination.blood_pressure : ""
        }
        title={"blood pressure"}
      />
    </div>
  );
};

export const Gynecological = ({ gynecological }) => {
  return <></>;
};

export const Cervix = ({ cervix }) => {
  return <></>;
};

export const Uterine = ({ uterine }) => {
  return <></>;
};

export const Obstetrics = ({ obstetrics }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={obstetrics ? obstetrics.gravidity : ""}
        title={"gravidity"}
      />

      <ArticalInfo
        description={obstetrics ? obstetrics.parity : ""}
        title={"parity"}
      />

      <ArticalInfo
        description={obstetrics ? obstetrics.abortion : ""}
        title={"abortion"}
      />

      <ArticalInfo
        col={2}
        description={obstetrics ? obstetrics.notes : ""}
        title={"notes"}
      />
    </div>
  );
};

export const Breast = ({ breast }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo description={breast ? breast.age : ""} title={"age"} />

      <ArticalInfo
        description={breast ? breast.family_history : ""}
        title={"family history"}
      />

      <ArticalInfo
        col={2}
        description={breast ? breast.recommendations : ""}
        title={"recommendations"}
      />
    </div>
  );
};
export const Ovarian = ({ ovarian }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={
          ovarian ? (ovarian.breast_cancer_history ? "yes" : "no") : ""
        }
        title={"Do you have a personal history of breast cancer?"}
        col={2}
      />

      <ArticalInfo
        description={
          ovarian ? (ovarian.relatives_with_ovarian_cancer ? "yes" : "no") : ""
        }
        title={"Do you have one or more relatives with ovarian cancer?"}
        col={2}
      />

      <ArticalInfo
        description={
          ovarian
            ? ovarian.gene_mutation_or_lynch_syndrome
              ? "yes"
              : "no"
            : ""
        }
        title={
          "Do you have the BRCA1 or BRCA2 gene mutation or Lynch syndrome - hereditary nonpolyposis colorectal cancer (HNPCC)?"
        }
        col={2}
      />

      <ArticalInfo
        description={ovarian ? ovarian.recommendations : ""}
        title={"recommendations"}
        col={2}
      />

      <table className="w-full text-md bg-white shadow-md mb-4 col-span-2 md:col-span-1">
        <tbody>
          <tr className="border-b">
            <th></th>
            <th className="text-left p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-t">
              Result
            </th>
            <th className="text-left p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-r border-t">
              Comments
            </th>
          </tr>
          <tr className=" bg-fuchsia-50 border-r border-b border-l border-blue-900 border-solid">
            <th className="p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-t border-r text-xl">
              TVS
            </th>
            <td className="p-3 px-5 border-blue-900 border-solid border-r">
              {ovarian ? ovarian.tvs_result || "" : ""}
            </td>
            <td className="p-3 px-5">
              {ovarian ? ovarian.tvs_comment || "" : ""}
            </td>
          </tr>
          <tr className="bg-fuchsia-50 border-r border-b border-l border-blue-900 border-solid">
            <th className="p-3 px-5 border-b border-l border-r border-blue-900 border-solid bg-neutral-200  text-xl">
              CA-125
            </th>
            <td className="p-3 px-5 border-blue-900 border-solid border-r">
              {ovarian ? ovarian["ca-125_result"] || "" : ""}
            </td>
            <td className="p-3 px-5">
              {ovarian ? ovarian["ca-125_comment"] || "" : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Osteoporosis = ({ osteoporosis }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={osteoporosis ? osteoporosis.age : ""}
        title={"age"}
      />

      <ArticalInfo
        description={osteoporosis ? osteoporosis.weight : ""}
        title={"weight"}
      />

      <ArticalInfo
        description={
          osteoporosis
            ? osteoporosis.current_oestrogen_use
              ? "yes"
              : "no"
            : ""
        }
        title={"current oestrogen use"}
      />

      <ArticalInfo
        col={2}
        description={osteoporosis ? osteoporosis.recommendations : ""}
        title={"recommendations"}
      />
    </div>
  );
};

export const PreEclampsia = ({ preEclampsia }) => {
  return (
    <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
      <ArticalInfo
        description={
          preEclampsia
            ? preEclampsia["history_of_pre-eclampsia"]
              ? "yes"
              : "no"
            : ""
        }
        title={"history of pre-eclampsia"}
      />

      <ArticalInfo
        description={
          preEclampsia ? preEclampsia.number_of_pregnancies_with_pe : ""
        }
        title={"number of pregnancies with pe"}
      />

      {preEclampsia &&
      preEclampsia.date_of_pregnancies_with_pe &&
      preEclampsia.date_of_pregnancies_with_pe.length
        ? preEclampsia.date_of_pregnancies_with_pe.map((date, index) => {
            if (date) {
              return (
                <ArticalInfo
                  key={index}
                  description={date}
                  title={`date of pregnancies with pe #${index + 1}`}
                />
              );
            }
          })
        : null}

      <ArticalInfo
        description={preEclampsia ? preEclampsia.fate_of_the_pregnancy : ""}
        title={"fate of the pregnancy"}
      />
    </div>
  );
};

const ArticalInfo = ({ title, description, col, phone = null }) => {
  return (
    <article
      className={`flex flex-col font-medium capitalize ${
        col && `md:col-span-${col}`
      }`}
    >
      <h3 className=" text-black   text-xl">{title || ""}</h3>
      {phone ? (
        <a
          className=" text-gray-600 text-base w-fit"
          href={`tel:${description}`}
        >
          {description || ""}
        </a>
      ) : (
        <p className=" text-gray-600 text-base">{description || ""}</p>
      )}
    </article>
  );
};
