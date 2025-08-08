let commentEditor = document.querySelector(".comment-editor");
if (commentEditor) {
  new Quill(commentEditor, {
    modules: { toolbar: ".comment-toolbar" },
    placeholder: "Write a Comment...",
    theme: "snow"
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const categoryTable = document.querySelector(".datatables-category-list");
  const selects = $(".select2");

  // Initialize Select2 dropdowns
  if (selects.length) {
    selects.each(function () {
      const el = $(this);
      el.wrap('<div class="position-relative"></div>').select2({
        dropdownParent: el.parent(),
        placeholder: el.data("placeholder")
      });
    });
  }

  // Initialize DataTable
  if (categoryTable) {
    new DataTable(categoryTable, {
      ajax: "json/student.json",
      columns: [
        { data: "id" },
        { data: "id", orderable: false, render: DataTable.render.select() },
        { data: "categories" },
        { data: "total_products" },
        { data: "total_earnings" },
        { data: "id" }
      ],
      columnDefs: [
        {
          className: "control",
          searchable: false,
          orderable: false,
          responsivePriority: 1,
          targets: 0,
          render: () => ""
        },
        {
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 4,
          checkboxes: true,
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          },
          render: () => '<input type="checkbox" class="dt-checkboxes form-check-input">'
        },
        {
          targets: 2,
          responsivePriority: 2,
          render: (data, type, row) => {
            const category = row.categories;
            const initials = (category.match(/\b\w/g) || []).slice(0, 2).join("").toUpperCase();
            const bgColor = ["success", "danger", "warning", "info", "dark", "primary", "secondary"][Math.floor(Math.random() * 7)];

            return `
              <div class="d-flex align-items-center">
                <div class="avatar-wrapper me-3 rounded-2 bg-label-secondary">
                  <div class="avatar">
                    <span class="avatar-initial rounded-2 bg-label-${bgColor}">${initials}</span>
                  </div>
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <span class="text-heading text-wrap fw-medium">${category}</span>
                </div>
              </div>
            `;
          }
        },
        {
          targets: 3,
          responsivePriority: 3,
          render: (data, type, row) => `<div class="text-sm-end">${row.total_products}</div>`
        },
        {
          targets: 4,
          orderable: false,
          render: (data, type, row) => `<div class="mb-0 text-sm-end">${row.total_earnings}</div>`
        },
        {
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: () => `
            <div class="d-flex align-items-sm-center justify-content-sm-center">
              <button class="btn btn-icon"><i class="icon-base bx bx-edit icon-md"></i></button>
              <button class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                <i class="icon-base bx bx-dots-vertical-rounded icon-md"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-end m-0">
                <a href="javascript:void(0);" class="dropdown-item">View</a>
                <a href="javascript:void(0);" class="dropdown-item">Suspend</a>
              </div>
            </div>
          `
        }
      ],
      select: {
        style: "multi",
        selector: "td:nth-child(2)"
      },
      order: [[2, "desc"]],
      layout: {
        topStart: {
          rowClass: "row m-3 my-0 justify-content-between",
          features: [
            {
              search: {
                placeholder: "Search Category",
                text: "_INPUT_"
              }
            }
          ]
        },
        topEnd: {
          rowClass: "row m-3 my-0 justify-content-between",
          features: {
            pageLength: {
              menu: [10, 25, 50, 100],
              text: "_MENU_"
            },
            buttons: [
              {
                text: '<i class="icon-base bx bx-plus icon-sm me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add User</span>',
                className: "add-new btn btn-primary",
                attr: {
                  "data-bs-toggle": "offcanvas",
                  "data-bs-target": "#offcanvasEcommerceCategoryList"
                }
              }
            ]
          }
        },
        bottomStart: {
          rowClass: "row mx-3 justify-content-between",
          features: ["info"]
        },
        bottomEnd: {
          paging: {
            firstLast: false
          }
        }
      },
      language: {
        paginate: {
          next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-18px"></i>',
          previous: '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-18px"></i>'
        }
      },
      responsive: {
        details: {
          display: DataTable.Responsive.display.modal({
            header: function (row) {
              return "Details of " + row.data().categories;
            }
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            const data = columns
              .map(col =>
                col.title
                  ? `<tr data-dt-row="${col.rowIndex}" data-dt-column="${col.columnIndex}">
                      <td>${col.title}:</td>
                      <td>${col.data}</td>
                    </tr>`
                  : ""
              )
              .join("");

            if (!data) return false;

            const table = document.createElement("table");
            table.classList.add("table");

            const tbody = document.createElement("tbody");
            tbody.innerHTML = data;
            table.appendChild(tbody);

            const wrapper = document.createElement("div");
            wrapper.classList.add("table-responsive");
            wrapper.appendChild(table);

            return wrapper;
          }
        }
      }
    });

    // Styling adjustments
    setTimeout(() => {
      [
        { selector: ".dt-buttons .btn", classToRemove: "btn-secondary" },
        { selector: ".dt-search .form-control", classToRemove: "form-control-sm", classToAdd: "ms-0" },
        { selector: ".dt-search", classToAdd: "mb-0 mb-md-6" },
        { selector: ".dt-length .form-select", classToRemove: "form-select-sm" },
        { selector: ".dt-layout-table", classToRemove: "row mt-2", classToAdd: "border-top" },
        { selector: ".dt-layout-start", classToAdd: "px-3 mt-0" },
        { selector: ".dt-layout-end", classToAdd: "px-3 column-gap-2 mt-0 mb-md-0 mb-4" },
        { selector: ".dt-layout-full", classToAdd: "table-responsive" }
      ].forEach(({ selector, classToRemove, classToAdd }) => {
        document.querySelectorAll(selector).forEach(el => {
          classToRemove?.split(" ").forEach(c => el.classList.remove(c));
          classToAdd?.split(" ").forEach(c => el.classList.add(c));
        });
      });
    }, 100);
  }
});

// Form Validation
(() => {
  const form = document.getElementById("eCommerceCategoryListForm");
  if (!form) return;

  FormValidation.formValidation(form, {
    fields: {
      categoryTitle: {
        validators: {
          notEmpty: { message: "Please enter category title" }
        }
      },
      slug: {
        validators: {
          notEmpty: { message: "Please enter slug" }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        eleValidClass: "is-valid",
        rowSelector: ".form-control-validation"
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  });
})();
